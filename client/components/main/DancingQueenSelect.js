import React, {Component} from 'react'
import {connect} from 'react-redux'

import anime from 'animejs'
import Wad from 'web-audio-daw'
import {SongModal} from '../menu/song-modal'
import {selectSong} from '../../store'

class DancinQueenSelect extends Component {
  constructor(props) {
    super(props)
    this.state = {
      preview: new Wad({source: this.props.preview}),
      show: false,
      expand: false
    }
    this.enterPoly = this.enterPoly.bind(this)
    this.exitPoly = this.exitPoly.bind(this)
  }

  enterPoly() {
    console.log('enter working', this.props.name)
    this.state.preview.play()
    this.setState({expand: true})
  }

  exitPoly() {
    console.log('leave working')
    this.state.preview.stop()
    this.setState({expand: false})
  }

  showModal = () => {
    this.setState({show: true})
  }

  hideModal = () => {
    this.setState({show: false})
  }

  confirmSound() {
    const confirmSound = new Audio('/assets/game-start.ogg')
    confirmSound.play()
  }

  render() {
    return (
      <div>
        <div
          className="songContainer"
          onMouseOver={this.enterPoly}
          onMouseOut={this.exitPoly}
          onClick={() => {
            this.showModal()
            this.props.selectSong(this.props.name)
            this.confirmSound()
          }}
        >
          <div
            width="20%"
            height="20%"
            viewBox="0 0 128 128"
            className={this.state.expand ? 'hexagon' : 'albums'}
          >
            <img width="275" height="150" src={this.props.image} />
          </div>{' '}
          {this.state.show && (
            <SongModal
              show={this.state.show}
              showModal={this.showModal}
              hideModal={this.hideModal}
            />
          )}
        </div>
        {this.state.show && (
          <SongModal
            show={this.state.show}
            showModal={this.showModal}
            hideModal={this.hideModal}
          />
        )}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    selectSong: song => dispatch(selectSong(song))
  }
}
export default connect(null, mapDispatchToProps)(DancinQueenSelect)

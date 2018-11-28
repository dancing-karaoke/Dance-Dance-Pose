import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Navbar from '../home/navbar'
import {SongModal} from './song-modal'
import {SongSelect} from '../index.js'
import {selectSong} from '../../store'

function menuSound() {
  const menuSound = new Audio('/assets/menu-select.mp3')
  menuSound.play()
}

function confirmSound() {
  const confirmSound = new Audio('/assets/game-start.ogg')
  confirmSound.play()
}

class SongMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false
    }
  }

  // state = {show: false}

  showModal = () => {
    this.setState({show: true})
  }

  hideModal = () => {
    this.setState({show: false})
  }

  render() {
    return (
      <div>
        <h1>PICK YOUR SONG!</h1>
        <div>
          <SongSelect />
          <button
            type="button"
            onMouseOver={menuSound}
            onClick={() => {
              this.showModal()
              this.props.selectSong('dancing-queen')
              confirmSound()
            }}
          >
            DANCING QUEEN BY ABBA
          </button>

          {this.state.show && (
            <SongModal
              show={this.state.show}
              showModal={this.showModal}
              hideModal={this.hideModal}
            />
          )}
        </div>

        <div>
          <button
            type="button"
            onMouseOver={menuSound}
            onClick={() => {
              this.showModal()
              confirmSound()
              this.props.selectSong('beat-it')
            }}
          >
            BEAT IT BY MICHAEL JACKSON
          </button>
          {this.state.show && (
            <SongModal
              show={this.state.show}
              showModal={this.showModal}
              hideModal={this.hideModal}
            />
          )}
          <video id="background-video" loop autoPlay>
            <source src="/assets/disco-lights.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    )
  }
}
const mapDispatchToProps = dispatch => {
  return {
    selectSong: song => dispatch(selectSong(song))
  }
}
export default connect(null, mapDispatchToProps)(SongMenu)

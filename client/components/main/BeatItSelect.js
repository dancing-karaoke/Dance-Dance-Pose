import React, {Component} from 'react'
import {connect} from 'react-redux'
import anime from 'animejs'
import Wad from 'web-audio-daw'
import {SongModal} from '../menu/song-modal'
import {selectSong} from '../../store'

class BeatItSelect extends Component {
  constructor(props) {
    super(props)
    this.state = {
      song: new Wad({source: '/songs/dancingqueen-preview.m4a'}),
      show: false
    }
    this.enterPoly = this.enterPoly.bind(this)
    this.exitPoly = this.exitPoly.bind(this)
  }

  enterPoly() {
    console.log('enter working')
    this.state.song.play()

    anime({
      targets: '#beatIt polygon',
      points: '64 128 8.574 96 8.574 32 64 0 119.426 32 119.426 96',
      easing: 'easeInOutExpo',
      duration: 200
    })
  }
  exitPoly() {
    console.log('leave working')
    this.state.song.stop()
    anime({
      targets: '#beatIt polygon',
      points:
        '64 68.86333111206183 8.574 99.98495073368855 63.23955416473961 67.54576054450193 64 3.9849507336885557 64.7604458352604 67.54576054450193 119.426 99.98495073368855 ',
      easing: 'easeInOutExpo',
      duration: 200
    })
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
      <div id="beatIt">
        {' '}
        <svg
          width="128"
          height="128"
          viewBox="0 0 128 128"
          onMouseEnter={this.enterPoly}
          onMouseLeave={this.exitPoly}
          onClick={() => {
            this.showModal()
            this.props.selectSong('beat-it')
            this.confirmSound()
          }}
        >
          <polygon
            points="64 68.86333111206183 8.574 99.98495073368855 63.23955416473961 67.54576054450193 64 3.9849507336885557 64.7604458352604 67.54576054450193 119.426 99.98495073368855 "
            fill="currentColor"
          />

          <defs>
            <clipPath id="clip">
              <polygon points="64 68.86333111206183 8.574 99.98495073368855 63.23955416473961 67.54576054450193 64 3.9849507336885557 64.7604458352604 67.54576054450193 119.426 99.98495073368855 " />
            </clipPath>
          </defs>

          <image
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            href="https://www.billboard.com/files/styles/article_main_image/public/media/michael-jackson-1986-performance-jkal-kevin-billboard-1548.jpg"
            clipPath="url(#clip)"
          />
        </svg>
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
export default connect(null, mapDispatchToProps)(BeatItSelect)

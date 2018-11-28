import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Navbar from '../home/navbar'
import {SongModal} from './song-modal'
import {DancingQueenSelect, BeatItSelect, JustDanceSelect} from '../index.js'
import {selectSong} from '../../store'
const albums = [
  {
    name: 'dancing-queen',
    preview: '/songs/dancingqueen-preview.m4a',
    image:
      'https://www.ft.com/__origami/service/image/v2/images/raw/ftcms%3A68cb1de8-cbdd-11e8-8d0b-a6539b949662?source=ig'
  },
  {
    name: 'beat-it',
    preview: '/songs/beatIt.m4a',
    image:
      'https://www.billboard.com/files/styles/article_main_image/public/media/michael-jackson-1986-performance-jkal-kevin-billboard-1548.jpg'
  },
  {
    name: 'gaga',
    preview: '/songs/justdance.m4a',
    image: 'https://blushmagfit.com/wp-content/uploads/2018/04/Portrait.jpg'
  }
]
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
        <div id="titleWrapper">
          <h1 className="sudbury">PICK YOUR SONG!</h1>
        </div>
        <div className="songSelect">
          <div className="albumContainer">
            {albums.map(album => {
              return (
                <DancingQueenSelect
                  id={album.id}
                  name={album.name}
                  preview={album.preview}
                  image={album.image}
                />
              )
            })}

            <video id="background-video" loop autoPlay>
              <source src="/assets/disco-lights.mp4" type="video/mp4" />
            </video>
          </div>
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

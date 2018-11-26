import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Navbar from '../home/navbar'
import {Modal} from './Modal'
import {SongSelect} from '../index.js'

//Notes to Team:
//-pass specific song to webcam component, import action type from the store
//-style this component

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

  state = {show: false}

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
              confirmSound()
            }}
          >
            DANCING QUEEN BY ABBA
          </button>

          {this.state.show && (
            <Modal
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
            }}
          >
            BEAT IT BY MICHAEL JACKSON
          </button>
          {this.state.show && (
            <Modal
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

export default SongMenu

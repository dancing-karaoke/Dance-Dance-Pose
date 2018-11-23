import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import Navbar from '../home/navbar'
import {Modal} from './Modal'
// import selectedSongMenu from './selected-song-menu'

//Notes to Team:
//-pass specific song to webcam component, import action type from the store
//-style this component

class SongMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false
    }
    this.showModal = this.showModal.bind(this)
    this.hideModal = this.hideModal.bind(this)
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
          <button type="button" onClick={this.showModal}>
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

        <Link to="/main">
          <div>
            <h3>BEAT IT</h3>
            <h4>MICHAEL JACKSON</h4>
          </div>
        </Link>
      </div>
    )
  }
}

export default SongMenu

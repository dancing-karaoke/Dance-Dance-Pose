import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {selectLevel} from '../../store'

function menuSound() {
  const menuSound = new Audio('/assets/menu-select.mp3')
  menuSound.play()
}

function confirmSound() {
  const confirmSound = new Audio('/assets/game-start.ogg')
  confirmSound.play()
}

class SelectedSongMenu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: 'easy'
    }
  }

  render() {
    return (
      <div className="modal-main">
        <div id="modal-exit-button">
          <button
            onClick={() => {
              this.props.hideModal()
              confirmSound()
            }}
          >
            X
          </button>
        </div>
        <div>
          <h1 className="homeLogo">CHOOSE YOUR Level:</h1>
          <span
            onClick={() => {
              this.props.selectLevel('easy')
              this.setState({selected: 'easy'})
              confirmSound()
            }}
            className={
              this.state.selected === 'easy'
                ? 'modal-content-selected'
                : 'modal-content'
            }
            onMouseOver={menuSound}
          >
            EASY (1.0x)
          </span>
          <span
            onClick={() => {
              this.props.selectLevel('medium')
              this.setState({selected: 'medium'})
              confirmSound()
            }}
            className={
              this.state.selected === 'medium'
                ? 'modal-content-selected'
                : 'modal-content'
            }
            onMouseOver={menuSound}
          >
            MEDIUM (1.2x)
          </span>
          <span
            onClick={() => {
              this.props.selectLevel('chaos')
              this.setState({selected: 'chaos'})
              confirmSound()
            }}
            className={
              this.state.selected === 'chaos'
                ? 'modal-content-selected'
                : 'modal-content'
            }
            onMouseOver={menuSound}
          >
            CHAOS! (1.5x)
          </span>
        </div>
        <div>
          <Link
            to="/main"
            onMouseOver={menuSound}
            className="modal-play-button"
            onClick={confirmSound}
          >
            <span className="modal-content-confirm">PLAY!</span>
          </Link>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    selectLevel: level => dispatch(selectLevel(level))
  }
}
export default connect(null, mapDispatchToProps)(SelectedSongMenu)

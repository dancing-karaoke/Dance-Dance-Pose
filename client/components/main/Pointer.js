import React, {Component} from 'react'
import anime from 'animejs'

class Pointer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let style
    if (this.props.note === this.props.userNote) {
      const y = 0
      style = {
        transform: `translateY(${y}px)`
      }
    } else {
      const y = 130
      style = {
        transform: `translateY(${y}px)`
      }
    }

    return this.props.currentTime ? (
      <div id="pointerDiv">
        <div className="arrow-left" style={style} />
        <div id="grad1" />
      </div>
    ) : null
  }
}

export default Pointer

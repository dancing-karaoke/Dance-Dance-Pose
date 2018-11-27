import React, {Component} from 'react'
import anime from 'animejs'

class Pointer extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    // if (this.props.note === this.props.userNote) {
    const y = -10
    const style = {
      transform: `translateY(${y}px)`
      //   }
      // } else {
      //   const y = 100
      //   const style = {
      // transform: `translateY(${y}px)`
      //   }
    }
    return (
      <div id="pointerDiv">
        <div className="arrow-left" style={style} />
        <div id="grad1" />
      </div>
    )
  }
}

export default Pointer

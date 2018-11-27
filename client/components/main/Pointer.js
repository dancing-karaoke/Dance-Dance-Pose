import React, {Component} from 'react'
import anime from 'animejs'

class Pointer extends Component {
  constructor(props) {
    super(props)

    // this.exitPoly = this.exitPoly.bind(this)
  }

  arrowMove() {}

  render() {
    // if (this.props.note ==== this.props.userNote){
    //     const x = 100;
    //     const y = 100;
    //     const styles = {
    //         transform: `translate(${x}px, ${y}px)`
    //     };
    // }
    // else if (this.props)
    return (
      <div id="pointerDiv">
        <div className="arrow-left" />
        <div id="grad1" />
      </div>
    )
  }
}

export default Pointer

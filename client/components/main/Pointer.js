import React, {Component} from 'react'
import anime from 'animejs'

class Pointer extends Component {
  constructor(props) {
    super(props)
    this.animateOne = this.animateOne.bind(this)
    this.animateTwo = this.animateTwo.bind(this)
    this.animateThree = this.animateThree.bind(this)

    // this.exitPoly = this.exitPoly.bind(this)
  }
  componentDidMount() {
    this.animateOne()
    // this.animateTwo()
    // this.animateThree()
  }
  animateOne() {
    // let currentY = anime.getValue('arrow-left', translateY)
    anime({
      targets: '#unitlessValue .el',
      translateY: '-13rem',
      rotate: 360,
      borderRadius: '8px',
      duration: 2000,
      loop: true
    })
  }

  render() {
    return (
      <div id="unitlessValue">
        <div className="arrow-left el" />
        <div id="grad1" />
      </div>
    )
  }
}

export default Pointer

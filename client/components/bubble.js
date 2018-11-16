import React, {Component} from 'react'
import {connect} from 'react-redux'

class Bubble extends Component {
  constructor(props) {
    super(props)
    this.state = {x: 0, y: 0}
  }

  componentDidMount() {
    // console.log('IN COMPDIDMOUNT', this.props.xBubble)

    this.props.generateRandomCoordinates()
    this.setState({
      x: this.props.xBubble,
      y: this.props.yBubble
    })
  }

  // componentDidUpdate(prevProps, prevState) {
  //   // console.log('TOUCHED COMPDID UPDATE', this.state)

  //   if (prevProps.xBubble !== this.props.xBubble) {
  //     this.setState({
  //       x: this.props.xBubble,
  //       y: this.props.yBubble
  //     })
  //   }
  //   // console.log('TOUCHED COMPDID UPDATE', this.state)
  // }

  // generateRandomCoordinates() {
  //   const xBubble = Math.random() * 1300
  //   const yBubble = Math.random() * 800
  //   this.setState({
  //     x: xBubble,
  //     y: yBubble
  //   })
  //   this.props.addX(xBubble)
  //   this.props.addY(yBubble)
  // }

  // eliminateBubble() {
  //   this.setState({
  //     x: 0,
  //     y: 0
  //   })
  // }

  render() {
    // console.log('IN BUBBLE COMP PROPS', this.props, 'STATE', this.state)
    return <div className="bubble">{this.props.render(this.state)}</div>
  }
}

const mapState = state => ({
  xBubble: state.bubble.xCoordinate,
  yBubble: state.bubble.yCoordinate
})

export default connect(mapState)(Bubble)

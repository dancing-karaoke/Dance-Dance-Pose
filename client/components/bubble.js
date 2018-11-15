import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getXCoordinate, getYCoordinate} from '../store/bubble'

class Bubble extends Component {
  constructor(props) {
    super(props)
    this.state = {x: 0, y: 0}
    this.generateRandomCoordinates = this.generateRandomCoordinates.bind(this)
  }

  componentDidMount() {
    this.generateRandomCoordinates()
  }

  generateRandomCoordinates() {
    const xBubble = Math.random() * 1300
    const yBubble = Math.random() * 800
    this.setState = {
      x: xBubble,
      y: yBubble
    }
    this.props.addX(xBubble)
    this.props.addY(yBubble)
  }

  render() {
    console.log('IN BUBBLE COMP PROPS', this.props, 'STATE', this.state)
    return <div className="bubble">{this.props.render(this.state)}</div>
  }
}

const mapDispatch = dispatch => {
  console.log('HERE')
  return {
    addX: num => dispatch(getXCoordinate(num)),
    addY: yBubble => dispatch(getYCoordinate(yBubble))
  }
}

export default connect(null, mapDispatch)(Bubble)

import React, {Component} from 'react'
import {connect} from 'react-redux'

class Bubble extends Component {
  constructor(props) {
    super(props)
    this.state = {x: 0, y: 0}
  }

  generateRandomCoordinates() {
    const xBubble = Math.random() * 1300
    const yBubble = Math.random() * 800
    this.setState = {
      xBubble: xBubble,
      yBubble: yBubble,
      xMin: xBubble * 0.9,
      xMa: xBubble * 1.1,
      yMin: yBubble * 0.9,
      yMax: yBubble * 1.1
    }
  }

  render() {
    return <div className="bubble">{this.props.render(this.state)}</div>
  }
}

const mapState = state => ({
  xBubble: state.xBubble,
  yBubble: state.yBubble
})

export default connect(mapState, null)(Bubble)

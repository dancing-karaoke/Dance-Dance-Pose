import React, {Component} from 'react'
import {connect} from 'react-redux'

class Bubble extends Component {
  constructor(props) {
    super(props)
    this.state = {x: 0, y: 0}
  }

  componentDidMount() {
    this.props.generateRandomCoordinates()
    this.setState({
      x: this.props.xBubble,
      y: this.props.yBubble
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.xBubble !== this.props.xBubble) {
      this.setState({
        x: this.props.xBubble,
        y: this.props.yBubble
      })
    }
  }

  render() {
    return <div className="bubble">{this.props.render(this.state)}</div>
  }
}

const mapState = state => ({
  xBubble: state.bubble.xCoordinate,
  yBubble: state.bubble.yCoordinate
})

export default connect(mapState)(Bubble)

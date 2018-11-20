import React, {Component} from 'react'
import {connect} from 'react-redux'

class Score extends Component {
  constructor(props) {
    super(props)
    this.state = {x: 20, y: 150}
  }

  render() {
    return (
      <div
        style={{
          position: 'absolute',
          bottom: this.state.y,
          left: this.state.x
        }}
      >
        <div className="scoreContainer">
          <img className="score" src="/score-spinner.gif" width="200" />
          <h2>{this.props.danceScore}</h2>
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  singScore: state.bubble.singScore,
  danceScore: state.bubble.danceScore
})

export default connect(mapState)(Score)

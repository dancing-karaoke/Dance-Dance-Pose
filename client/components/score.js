import React, {Component} from 'react'
import {connect} from 'react-redux'

class Score extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div id="test">
        <div className="scoreContainer">
          <img className="score" src="/score-spinner.gif" width="50" />
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

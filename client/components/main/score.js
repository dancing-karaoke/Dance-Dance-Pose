import React, {Component} from 'react'
import {connect} from 'react-redux'

class Score extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const totalScore = this.props.danceScore
    // const fire = totalScore > 100 ? <Fire /> : <h2 />
    return (
      <div className="scoreCont">
        {/* {fire} */}
        <h2>SCORE: {totalScore}</h2>
      </div>
    )
  }
}

const mapState = state => ({
  singScore: state.bubble.singScore,
  danceScore: state.bubble.danceScore
})

export default connect(mapState)(Score)

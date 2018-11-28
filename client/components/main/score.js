import React, {Component} from 'react'
import {connect} from 'react-redux'
import Fire from '../../components/bubbles/Fire'

class Score extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const totalScore = this.props.danceScore + this.props.singScore
    const fire = totalScore % 5000 === 0 && totalScore > 0 ? <Fire /> : <h2 />
    return (
      <div>
        {fire}
        <div className="scoreCont">
          <h2 className="sudbury">SCORE: {totalScore}</h2>
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

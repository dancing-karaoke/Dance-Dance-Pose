import React, {Component} from 'react'
import {connect} from 'react-redux'

class Score extends Component {
  constructor(props) {
    super(props)
    this.state = {x: 20, y: 150}
  }

  // componentDidMount() {
  //   this.setState({
  //     x: this.props.singScore,
  //     y: this.props.danceScore
  //   })
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   if (
  //     prevProps.danceScore !== this.props.danceScore ||
  //     prevProps.singScore !== this.props.singScore
  //   ) {
  //     this.setState({
  //       x: this.props.singScore,
  //       y: this.props.danceScore
  //     })
  //   }
  // }

  render() {
    console.log('THIS>PROPS', this.props)
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

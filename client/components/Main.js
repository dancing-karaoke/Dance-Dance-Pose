import React, {Component} from 'react'
import Wad from 'web-audio-daw'
import Sing from './Sing'
import Webcam from './webcam'
import Score from './score'

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      song: new Wad({source: '/adele.mp3'})
    }
    this.danceDancePoseTime = this.danceDancePoseTime.bind(this)
  }

  danceDancePoseTime = () => {
    this.sing.handlePitchLogger()
    this.dance.startTimer()
  }

  render() {
    return (
      <div>
        <Score />
        <button onClick={this.danceDancePoseTime}> LET'S GO </button>
        <Sing onRef={ref => (this.sing = ref)} song={this.state.song} />
        <Webcam onRef={ref => (this.dance = ref)} song={this.state.song} />
      </div>
    )
  }
}

export default Main

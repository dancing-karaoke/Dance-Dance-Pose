import React, {Component} from 'react'
import Wad from 'web-audio-daw'
import Sing from './Sing'
import Webcam from './webcam'

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      song: new Wad({source: '/adele.mp3'})
    }
  }

  render() {
    return (
      <div>
        <Sing song={this.state.song} />
        <Webcam song={this.state.song} />
      </div>
    )
  }
}

//test

export default Main

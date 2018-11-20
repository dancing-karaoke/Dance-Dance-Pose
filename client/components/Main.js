import React, {Component} from 'react'
import Wad from 'web-audio-daw'
import Sing from './Sing'

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      song: new Wad({source: '/adele.mp3'})
    }
  }

  render() {
    return <Sing song={this.state.song} />
  }
}

export default Main

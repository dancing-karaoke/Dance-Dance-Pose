import React, {Component} from 'react'
import Wad from 'web-audio-daw'
import Sing from './Sing'
import Webcam from './webcam'
import Logo from '.././home/logo'
import {connect} from 'react-redux'
import {selectSong, getSingScore} from '../../store/song'
import {setSong} from './utils'

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      song: new Wad({source: '/songs/dancingqueen.m4a'})
    }
    this.danceDancePoseTime = this.danceDancePoseTime.bind(this)
  }

  componentDidMount() {
    let selectedSong = setSong()
    this.setState({
      song: new Wad({source: selectedSong})
    })
  }

  danceDancePoseTime = () => {
    this.sing.handlePitchLogger()
    this.dance.startTimer()
  }

  render() {
    return (
      <div>
        <Logo />
        {/* <Score /> */}
        <div className="Lyrics">
          <Sing
            onRef={ref => (this.sing = ref)}
            song={this.state.song}
            sing={this.props.sing}
          />
        </div>
        <div>
          <Webcam
            onRef={ref => (this.dance = ref)}
            song={this.state.song}
            danceDancePoseTime={this.danceDancePoseTime}
          />
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  selectedSong: state.song.selectedSong,
  singScore: state.song.singScore,
  loading: state.bubble.loading
})

const mapDispatch = {selectSong, getSingScore}

export default connect(mapState, mapDispatch)(Main)

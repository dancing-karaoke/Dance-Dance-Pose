import React, {Component} from 'react'
import Wad from 'web-audio-daw'
import {connect} from 'react-redux'
import {getSingScore} from '../../store/bubble'
import {Pointer} from './Pointer'

class Sing extends Component {
  constructor(props) {
    super(props)
    this.state = {
      trackingPitch: false,
      score: 0,
      userNote: 'waiting for song to start',
      currentTime: 0,
      currentSongNotes: {
        0.5: 'no note',
        1: 'no note',
        1.5: 'G',
        2: 'C',
        2.5: 'C',
        3: 'C',
        3.5: 'C',
        4: 'B',
        4.5: 'D',
        5: 'D',
        5.5: 'C',
        6: 'F',
        6.5: 'E',
        7: 'B',
        7.5: 'B',
        8: 'F',
        8.5: 'F',
        9: 'F',
        9.5: 'F',
        10: 'E',
        10.5: 'E',
        11: 'F',
        11.5: 'C',
        12: 'C',
        12.5: 'C',
        13: 'C',
        13.5: 'A',
        14: 'B',
        14.5: 'B',
        15: 'D',
        15.5: 'G',
        16: 'B',
        16.5: 'B',
        17: 'F',
        17.5: 'E',
        18: 'E',
        18.5: 'C',
        19: 'C',
        19.5: 'A',
        20: 'A',
        20.5: 'A',
        21: 'C',
        21.5: 'B',
        22: 'B',
        22.5: 'B',
        23: 'C',
        23.5: 'C',
        24: 'B',
        24.5: 'B',
        25: 'C',
        25.5: 'A',
        26: 'A',
        26.5: 'G',
        27: 'A',
        27.5: 'A',
        28: 'A',
        28.5: 'F',
        29: 'F',
        29.5: 'C',
        30: 'A',
        30.5: 'G',
        31: 'A',
        31.5: 'A',
        32: 'A',
        32.5: 'A',
        33: 'G',
        33.5: 'A',
        34: 'E',
        34.5: 'E',
        35: 'A',
        35.5: 'A',
        36: 'A',
        36.5: 'A',
        37: 'E',
        37.5: 'E',
        38: 'E',
        38.5: 'E',
        39: 'E',
        39.5: 'D',
        40: 'D',
        40.5: 'F',
        41: 'G',
        41.5: 'G',
        42: 'G',
        42.5: 'G',
        43: 'G',
        43.5: 'G',
        44: 'G',
        44.5: 'F',
        45: 'F',
        45.5: 'F',
        46: 'E',
        46.5: 'E',
        47: 'F',
        47.5: 'F',
        48: 'F',
        48.5: 'F',
        49: 'F',
        49.5: 'F',
        50: 'E',
        50.5: 'E',
        51: 'A',
        51.5: 'B',
        52: 'C',
        52.5: 'C',
        53: 'C',
        53.5: 'D',
        54: 'E',
        54.5: 'D',
        55: 'D',
        55.5: 'E',
        56: 'E',
        56.5: 'E',
        57: 'D',
        57.5: 'G',
        58: 'F',
        58.5: 'F',
        59: 'F',
        59.5: 'F',
        60: 'C'
      },
      lyricsData: [
        [
          {start: '1.5', end: '3.25', text: 'Ooooooooooh'},
          {start: '3.25', end: '5.55', text: 'Ooooooooooh'},
          {start: '5.5', end: '10.3', text: 'Ooooooooooh'},
          {start: '10.3', end: '11', text: ' ', finalWord: true}
        ],
        [
          {start: '11', end: '13.5', text: 'Ooooooooooh'},
          {start: '12.3', end: '15', text: 'Ooooooooooh'},
          {start: '15', end: '17', text: 'Ooooooooooh'},
          {start: '17', end: '20.1', text: 'Ooooooooooh'},
          {start: '20.1', end: '20.3', text: ' ', finalWord: true}
        ],
        [
          {start: '20.3', end: '20.5', text: 'You'},
          {start: '20.5', end: '21', text: 'can'},
          {start: '21.5', end: '22.2', text: 'dance'},
          {start: '22.2', end: '22.45', text: ' ', finalWord: true}
        ],
        [
          {start: '22.45', end: '23.3', text: 'You'},
          {start: '23.4', end: '23.6', text: 'can'},
          {start: '23.6', end: '25', text: 'jive'},
          {start: '25', end: '25.5', text: ' ', finalWord: true}
        ],
        [
          {start: '25.5', end: '26.3', text: 'Having'},
          {start: '26.3', end: '26.6', text: 'the'},
          {start: '26.6', end: '27.2', text: 'time'},
          {start: '27.2', end: '27.4', text: 'of'},
          {start: '27.4', end: '27.8', text: 'your'},
          {start: '27.8', end: '28.1', text: 'life'},
          {start: '28.1', end: '28.3', text: ' ', finalWord: true}
        ],
        [
          {start: '28.3', end: '29.5', text: 'Ooooooooooh'},
          {start: '29.5', end: '30', text: ' ', finalWord: true}
        ],
        [
          {start: '30', end: '30.5', text: 'see'},
          {start: '30.5', end: '31', text: 'that'},
          {start: '31', end: '31.5', text: 'girl'},
          {start: '31.5', end: '31.8', text: ' ', finalWord: true}
        ],
        [
          {start: '32', end: '32.4', text: 'Watch'},
          {start: '32.4', end: '33', text: 'that'},
          {start: '33', end: '33.4', text: 'scene'},
          {start: '33.4', end: '33.5', text: ' ', finalWord: true}
        ],
        [
          {start: '33.5', end: '33.8', text: 'Dig'},
          {start: '33.8', end: '34.1', text: 'in'},
          {start: '34.1', end: '34.4', text: 'the'},
          {start: '34.4', end: '34.9', text: 'dancing'},
          {start: '34.9', end: '38.8', text: 'queen'},
          {start: '38.8', end: '39', text: ' ', finalWord: true}
        ],
        [
          {start: '39', end: '43.8', text: 'Ooooooooooh'},
          {start: '43.8', end: '44', text: ' ', finalWord: true}
        ],
        [
          {start: '44', end: '44.5', text: 'Friday'},
          {start: '44.5', end: '45', text: 'night'},
          {start: '45', end: '45.5', text: 'and'},
          {start: '45.5', end: '45.8', text: 'the'},
          {start: '45.8', end: '46.1', text: 'lights'},
          {start: '46.1', end: '46.4', text: 'are'},
          {start: '46.4', end: '48.8', text: 'low'},
          {start: '48.8', end: '49', text: ' ', finalWord: true}
        ],
        [
          {start: '49', end: '49.5', text: 'Looking'},
          {start: '49.5', end: '50', text: 'out'},
          {start: '50', end: '50.5', text: 'for'},
          {start: '50.5', end: '50.8', text: 'a'},
          {start: '50.8', end: '51.1', text: 'place'},
          {start: '51.1', end: '51.4', text: 'to'},
          {start: '51.4', end: '53.8', text: 'go'},
          {start: '53.8', end: '54', text: ' ', finalWord: true}
        ],
        [
          {start: '54', end: '54.3', text: 'Where'},
          {start: '54.3', end: '54.7', text: 'they'},
          {start: '54.7', end: '55', text: 'play'},
          {start: '55', end: '55.3', text: 'the'},
          {start: '55.3', end: '55.6', text: 'right'},
          {start: '55.6', end: '55.9', text: 'music'},
          {start: '55.9', end: '56', text: ' ', finalWord: true}
        ],
        [
          {start: '56', end: '56.4', text: 'Getting'},
          {start: '56.4', end: '56.7', text: 'in'},
          {start: '56.7', end: '57', text: 'the'},
          {start: '57', end: '57.8', text: 'swing'},
          {start: '57.8', end: '58', text: ' ', finalWord: true}
        ],
        [
          {start: '58', end: '58.3', text: 'You'},
          {start: '58.3', end: '58.6', text: 'come'},
          {start: '58.6', end: '58.9', text: 'to'},
          {start: '58.9', end: '59.2', text: 'look'},
          {start: '59.2', end: '59.5', text: 'for'},
          {start: '59.5', end: '59.8', text: 'a'},
          {start: '59.8', end: '60.3', text: 'king'},
          {start: '60.3', end: '60.5', text: ' ', finalWord: true}
        ]
      ],
      displaySubtitle: ''
    }
    this.pitchLogger = this.pitchLogger.bind(this)
    this.handlePitchLogger = this.handlePitchLogger.bind(this)
    this.createSubtitle = this.createSubtitle.bind(this)
  }

  componentDidMount() {
    this.props.onRef(this)
  }

  componentWillUnmount() {
    // stop selected song from playing
    this.props.song.stop()

    // force refresh if navigating away from the page
    location.reload(true)
  }

  handlePitchLogger() {
    this.setState({trackingPitch: true}, function() {
      this.pitchLogger()
    })
  }

  createSubtitle = () => {
    let windowTime = this.props.song.destination.context.currentTime
    let subtitles = document.getElementById('subtitles')

    let currentSection = 0
    let subtitleInnerHtml = ''

    for (let i = 0; i < this.state.lyricsData[currentSection].length; i++) {
      subtitleInnerHtml += `<span>${this.state.lyricsData[currentSection][i]
        .text + ' '}</span>`
    }

    this.setState({displaySubtitle: subtitleInnerHtml})

    let stop = false
    let updateLyricsInterval

    const updateLyricsSection = () => {
      this.state.lyricsData[currentSection].forEach((ele, index) => {
        if (
          this.props.song.destination.context.currentTime - windowTime >=
            ele.start &&
          this.props.song.destination.context.currentTime - windowTime <=
            ele.end
        ) {
          subtitles.children[index].style.color = 'green'
          if (ele.finalWord) {
            currentSection++
            // break if on last section of lyrics
            if (currentSection === this.state.lyricsData.length) {
              stop = true
            }

            // reset for next block of lyrics
            subtitleInnerHtml = ''

            // update subtitle div
            for (
              let i = 0;
              !stop && i < this.state.lyricsData[currentSection].length;
              i++
            ) {
              subtitleInnerHtml += `<span>${this.state.lyricsData[
                currentSection
              ][i].text + ' '}</span>`
            }
          }

          // render new lyrics
          this.setState({displaySubtitle: subtitleInnerHtml})
        }
      })

      // end recursive call and return if all lyrics have played
      if (
        this.state.trackingPitch === false ||
        currentSection === this.state.lyricsData.length
      ) {
        this.setState({displaySubtitle: 'Thanks for playing!'})
        cancelAnimationFrame(updateLyricsInterval)
        return
      }

      // recursively call itself
      updateLyricsInterval = requestAnimationFrame(updateLyricsSection)
    }
    // start
    updateLyricsSection()
  }

  pitchLogger = () => {
    if (this.state.trackingPitch === true) {
      let voice = new Wad({source: 'mic'}) // also asks for microphone permission
      let tuner = new Wad.Poly()
      let song = this.props.song

      song.play()

      let windowTime = tuner.destination.context.currentTime.toFixed(1)

      tuner.setVolume(0) // eliminate microphone feedback by muting the output from the tuner
      tuner.add(voice)

      voice.play() // you must have browser permission to access microphone before calling play()
      tuner.updatePitch() // the tuner is now calculating the pitch and note name

      let results = {}
      let pitchDetect

      let logPitch = () => {
        // this.setState(prevState => ({
        //   score: (prevState.score += 0.5)
        // }))
        // this.props.addScore(this.state.score)

        if (
          (tuner.destination.context.currentTime - windowTime).toFixed(1) %
            0.5 ===
            0 &&
          (tuner.destination.context.currentTime - windowTime).toFixed(1) > 0
        ) {
          let time =
            (tuner.destination.context.currentTime - windowTime).toFixed(1) ||
            (tuner.destination.context.currentTime - windowTime).toFixed(0)
          // console.log(results)
          this.setState({currentTime: time})

          let note
          if (!results[time]) {
            // include sharps: replace(/[0-9]/g, '')
            tuner.noteName
              ? (note = tuner.noteName[0])
              : (note = 'no note detected')
            results[time] = note
            this.setState({userNote: note})
            if (
              results[time] === this.state.currentSongNotes[time] &&
              results[time] !== undefined
            ) {
              this.setState(prevState => ({
                score: (prevState.score += 1000)
              }))
              this.props.addScore(this.state.score)
            }

            // track end
            if (
              (tuner.destination.context.currentTime - windowTime).toFixed(1) >
              20
            ) {
              cancelAnimationFrame(pitchDetect)
              this.props.song.stop()
              console.log(
                'ended at: ',
                (tuner.destination.context.currentTime - windowTime).toFixed(1)
              )
              this.setState({trackingPitch: false})
              return
            }
          }
        }
        pitchDetect = requestAnimationFrame(logPitch)
      }
      logPitch()
      this.createSubtitle()
    }
    // tuner.stopUpdatingPitch(); // Stop calculating the pitch
  }

  render() {
    return (
      <div>
        {/* <Pointer
          note={this.state.currentSongNotes[this.state.currentTime]}
          userNote={this.state.userNote}
        /> */}
        <div
        // style={{
        //   position: 'absolute',
        //   bottom: 450,
        //   left: 40
        // }}
        >
          {/* <p>Current Note: {this.state.userNote}</p>
          <p>Score: {this.state.score}</p>
          <p>Current Time: {this.state.currentTime}</p>
          <p>
            Target Note: {this.state.currentSongNotes[this.state.currentTime]}
          </p> */}
          <div
            id="subtitles"
            dangerouslySetInnerHTML={{__html: this.state.displaySubtitle}}
          />
        </div>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    addScore: danceScore => dispatch(getSingScore(danceScore))
  }
}

export default connect(null, mapDispatch)(Sing)

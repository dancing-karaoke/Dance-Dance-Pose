import React, {Component} from 'react'
import Wad from 'web-audio-daw'

class Sing extends Component {
  constructor(props) {
    super(props)
    this.state = {
      trackingPitch: false,
      score: 0,
      userNote: 'waiting for song to start',
      currentTime: 0,
      currentSongNotes: {
        0.5: 'no note detected',
        1: 'no note detected',
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
        // [
        //   {start: '1', end: '1.5', text: '1'},
        //   {start: '1.5', end: '2', text: '1', finalWord: true}
        // ],
        // [
        //   {start: '2', end: '2.5', text: '2'},
        //   {start: '2.5', end: '3', text: '2', finalWord: true}
        // ],
        // [
        //   {start: '3', end: '3.5', text: '3'},
        //   {start: '3.5', end: '4', text: '3', finalWord: true}
        // ]
        [
          {start: '3', end: '5', text: 'I'},
          {start: '5', end: '5.5', text: 'heard'},
          {start: '6.5', end: '7', text: 'that'},
          {start: '7', end: '7.5', text: 'you'},
          {start: '8', end: '9.5', text: 'settled'},
          {start: '9.5', end: '10', text: 'down'},
          {start: '10', end: '11', text: ' ', finalWord: true}
        ],
        [
          {start: '10.5', end: '11', text: 'that'},
          {start: '12', end: '13', text: 'you'},
          {start: '13', end: '14', text: 'found'},
          {start: '14', end: '15', text: 'a'},
          {start: '16', end: '17', text: 'girl'},
          {start: '17', end: '18', text: 'and'},
          {start: '18', end: '19', text: "you're"},
          {start: '19', end: '20', text: 'married', finalWord: true}
        ],
        [
          {start: '20', end: '21', text: 'whoa'},
          {start: '21', end: '22', text: 'you'},
          {start: '22', end: '23', text: 'made'},
          {start: '23', end: '24', text: 'it'},
          {start: '24', end: '25', text: 'so'},
          {start: '25', end: '26', text: 'far'},
          {start: '26', end: '27', text: 'end'},
          {start: '27', end: '28', text: 'interval?', finalWord: true}
        ],
        [
          {start: '28', end: '29', text: '###'},
          {start: '21', end: '22', text: '###'},
          {start: '22', end: '23', text: 'made'},
          {start: '23', end: '24', text: 'it'},
          {start: '24', end: '25', text: 'so'},
          {start: '25', end: '26', text: 'far'},
          {start: '26', end: '27', text: 'end'},
          {start: '27', end: '28', text: 'interval?', finalWord: true}
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
          subtitles.children[index].style.color = 'yellow'
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
      if (currentSection === this.state.lyricsData.length) {
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

      let logPitch = () => {
        requestAnimationFrame(logPitch)

        if (
          (tuner.destination.context.currentTime.toFixed(1) - windowTime) %
            0.5 ===
            0 &&
          tuner.destination.context.currentTime.toFixed(1) - windowTime > 0
        ) {
          let time =
            tuner.destination.context.currentTime.toFixed(1) - windowTime ||
            tuner.destination.context.currentTime.toFixed(0) - windowTime
          console.log(results)
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
                score: prevState.score + 1
              }))
            }
          }
        }
      }
      logPitch()
      this.createSubtitle()
    }
    // tuner.stopUpdatingPitch(); // Stop calculating the pitch
  }

  render() {
    return (
      <div>
        <div
          style={{
            position: 'absolute',
            bottom: 450,
            left: 40
          }}
        >
          <p>Current Note: {this.state.userNote}</p>
          <p>Score: {this.state.score}</p>
          <p>Current Time: {this.state.currentTime}</p>
          <p>
            Target Note: {this.state.currentSongNotes[this.state.currentTime]}
          </p>
          <div
            id="subtitles"
            dangerouslySetInnerHTML={{__html: this.state.displaySubtitle}}
          />
        </div>
      </div>
    )
  }
}

export default Sing

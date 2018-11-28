import * as posenet from '@tensorflow-models/posenet'
import React, {Component} from 'react'
import {
  drawKeypoints,
  drawSkeleton,
  setBeats,
  setLevel,
  consoleSongandLevel
} from './utils'
import Bubble from '../bubbles/bubble'
import Bubble2 from '../bubbles/bubble2'
import {connect} from 'react-redux'
import {
  getXCoordinate,
  getYCoordinate,
  getDanceScore,
  getXCoordinate2,
  getYCoordinate2,
  sendLoadingState
} from '../../store/bubble'

import Score from './score'

let counter = 0

const defaultParameters = {
  minBubblex: 75,
  maxBubblex: 1050,
  minHandBubbley: 35,
  maxHandBubbley: 430,
  minFootBubbley: 430,
  maxFootBubbley: 580,
  rangeSpectrum: 0.3,
  minConfidencePoints: 0.5
}

class PoseNet extends React.Component {
  static defaultProps = {
    videoWidth: window.screen.width * 0.95,
    videoHeight: window.screen.height * 0.65,
    flipHorizontal: true,
    algorithm: 'single-pose',
    showVideo: true,
    showSkeleton: true,
    showPoints: true,
    minPoseConfidence: 0.3,
    minPartConfidence: 0.5,
    maxPoseDetections: 2,
    nmsRadius: 20.0,
    outputStride: 32,
    imageScaleFactor: 0.4,
    skeletonColor: 'coral',
    skeletonLineWidth: 6,
    loadingText: 'Loading pose detector...'
  }

  constructor(props) {
    super(props, PoseNet.defaultProps)
    this.state = {
      keys: {
        up: 0,
        down: 0
      },
      loading: true,
      xMin: 0,
      xMax: 0,
      yMin: 0,
      yMax: 0,
      xMin2: 0,
      xMax2: 0,
      yMin2: 0,
      yMax2: 0,
      windowTime: this.props.song.destination.context.currentTime,
      time: '',
      counterBeatInterval: 0,
      BubblePace: 0
    }
    this.generateRandomCoordinates = this.generateRandomCoordinates.bind(this)
    this.generateRandomCoordinates2 = this.generateRandomCoordinates2.bind(this)
    this.emilinateBubble = this.eliminateBubble.bind(this)
    this.emilinateBubble2 = this.eliminateBubble2.bind(this)
    this.startTimer = this.startTimer.bind(this)
    this.handleTimer = this.handleTimer.bind(this)
  }

  getCanvas = elem => {
    this.canvas = elem
  }

  getVideo = elem => {
    this.video = elem
  }

  async componentDidMount() {
    try {
      await this.setupCamera()
      this.net = await posenet.load()
    } catch (e) {
      throw 'This browser does not support video capture, or this device does not have a camera'
    } finally {
      setTimeout(() => {
        this.setState({loading: false})
        this.props.sendLoadingState(false)
      }, 200)

      // this.setState({loading: false})
      // this.props.sendLoadingState(false)
    }
    this.detectPose()
    this.props.onRef(this)
    this.props.danceDancePoseTime()
  }

  async setupCamera() {
    // MDN: https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw 'Browser API navigator.mediaDevices.getUserMedia not available'
    }
    const {videoWidth, videoHeight} = this.props
    const video = this.video
    video.width = videoWidth
    video.height = videoHeight

    // MDN: https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        facingMode: 'user',
        width: videoWidth,
        height: videoHeight
      }
    })

    video.srcObject = stream

    return new Promise(resolve => {
      video.onloadedmetadata = () => {
        // Once the video metadata is ready, we can start streaming video
        video.play()
        resolve(video)
      }
    })
  }

  detectPose() {
    const {videoWidth, videoHeight} = this.props
    const canvas = this.canvas
    const ctx = canvas.getContext('2d')

    canvas.width = videoWidth
    canvas.height = videoHeight

    this.poseDetectionFrame(ctx)
  }

  poseDetectionFrame(ctx) {
    const {
      algorithm,
      imageScaleFactor,
      flipHorizontal,
      outputStride,
      minPoseConfidence,
      maxPoseDetections,
      minPartConfidence,
      nmsRadius,
      videoWidth,
      videoHeight,
      showVideo,
      showPoints,
      showSkeleton,
      skeletonColor,
      skeletonLineWidth
    } = this.props

    const net = this.net
    const video = this.video

    const poseDetectionFrameInner = async () => {
      let poses = []

      switch (algorithm) {
        case 'multi-pose':
          poses = await net.estimateMultiplePoses(
            video,
            imageScaleFactor,
            flipHorizontal,
            outputStride,
            maxPoseDetections,
            minPartConfidence,
            nmsRadius
          )

          break
        case 'single-pose':
          const pose = await net.estimateSinglePose(
            video,
            imageScaleFactor,
            flipHorizontal,
            outputStride
          )
          // index 10 is rightWrist
          // index 9 is left Wrist
          //index 13 is right knee
          const {rangeSpectrum, minConfidencePoints} = defaultParameters
          this.setState({
            xMin: this.props.xBubble * (1 - rangeSpectrum),
            xMax: this.props.xBubble * (1 + rangeSpectrum),
            yMin: this.props.yBubble * (1 - rangeSpectrum),
            yMax: this.props.yBubble * (1 + rangeSpectrum),
            xMin2: this.props.xBubble * (1 - rangeSpectrum),
            xMax2: this.props.xBubble * (1 + rangeSpectrum),
            yMin2: this.props.yBubble * (1 - rangeSpectrum),
            yMax2: this.props.yBubble * (1 + rangeSpectrum)
          })
          if (
            (this.state.xMin < pose.keypoints[10].position.x &&
              pose.keypoints[10].position.x < this.state.xMax &&
              this.state.yMin < pose.keypoints[10].position.y &&
              pose.keypoints[10].position.y < this.state.yMax &&
              pose.keypoints[10].score > minConfidencePoints) ||
            (this.state.xMin < pose.keypoints[9].position.x &&
              pose.keypoints[9].position.x < this.state.xMax &&
              this.state.yMin < pose.keypoints[9].position.y &&
              pose.keypoints[9].position.y < this.state.yMax &&
              pose.keypoints[9].score > minConfidencePoints)
          ) {
            counter = counter + 1000
            this.eliminateBubble()
            this.props.addScore(counter)
          }

          if (
            (this.state.xMin2 < pose.keypoints[11].position.x &&
              pose.keypoints[11].position.x < this.state.xMax2 &&
              this.state.yMin2 < pose.keypoints[11].position.y &&
              pose.keypoints[11].position.y < this.state.yMax2 &&
              pose.keypoints[11].score > minConfidencePoints) ||
            (this.state.xMin2 < pose.keypoints[12].position.x &&
              pose.keypoints[12].position.x < this.state.xMax2 &&
              this.state.yMin2 < pose.keypoints[12].position.y &&
              pose.keypoints[12].position.y < this.state.yMax2 &&
              pose.keypoints[12].score > minConfidencePoints)
          ) {
            counter = counter + 5000
            this.eliminateBubble2()
            this.props.addScore(counter)
          }

          poses.push(pose)
          break
      }

      ctx.clearRect(0, 0, videoWidth, videoHeight)

      if (showVideo) {
        ctx.save()
        ctx.scale(-1, 1)
        ctx.translate(-videoWidth, 0)
        ctx.drawImage(video, 0, 0, videoWidth, videoHeight)
        ctx.restore()
      }

      // For each pose (i.e. person) detected in an image, loop through the poses
      // and draw the resulting skeleton and keypoints if over certain confidence
      // scores
      poses.forEach(({score, keypoints}) => {
        if (score >= minPoseConfidence) {
          if (showPoints) {
            drawKeypoints(keypoints, minPartConfidence, skeletonColor, ctx)
          }
          if (showSkeleton) {
            drawSkeleton(
              keypoints,
              minPartConfidence,
              skeletonColor,
              skeletonLineWidth,
              ctx
            )
          }
        }
      })

      requestAnimationFrame(poseDetectionFrameInner)
    }
    poseDetectionFrameInner()
  }

  generateRandomCoordinates() {
    const {
      minBubblex,
      maxBubblex,
      maxHandBubbley,
      minHandBubbley
    } = defaultParameters
    const xBubble = Math.random() * (maxBubblex - minBubblex) + minBubblex
    const yBubble =
      Math.random() * (maxHandBubbley - minHandBubbley) + minHandBubbley
    this.props.addX(xBubble)
    this.props.addY(yBubble)
  }
  //manages coordinates for second bubble
  generateRandomCoordinates2() {
    const {
      minFootBubbley,
      maxFootBubbley,
      maxBubblex,
      minBubblex
    } = defaultParameters
    const xBubble = Math.random() * (maxBubblex - minBubblex) + minBubblex
    const yBubble =
      Math.random() * (maxFootBubbley - minFootBubbley) + minFootBubbley
    this.props.addX2(xBubble)
    this.props.addY2(yBubble)
  }

  async startTimer() {
    let startTime = new Date()
    const beatsToDisplay = setBeats()
    // console.log('HE', beatsToDisplay)
    await this.setState({
      time: startTime,
      windowTime: this.props.song.destination.context.currentTime
    })
    const bumpingBeats = setInterval(() => {
      if (this.state.counterBeatInterval < beatsToDisplay.length) {
        this.handleTimer()
      } else {
        clearInterval(bumpingBeats)
      }
    }, 100)
  }

  handleTimer() {
    const beatsToDisplay = setBeats()
    const beatTime = beatsToDisplay[this.state.counterBeatInterval]
    const level = setLevel()
    if (
      this.props.song.destination.context.currentTime - this.state.windowTime >
      beatTime
    ) {
      if (this.state.BubblePace === 4) {
        this.generateRandomCoordinates2()
        const newBubblePace = 0
        this.setState({
          BubblePace: newBubblePace
        })
      } else {
        if (this.state.BubblePace !== 0) {
          this.eliminateBubble2()
        }
        const newBubblePace = this.state.BubblePace + 1
        this.setState({
          BubblePace: newBubblePace
        })
      }
      this.generateRandomCoordinates()
      const newCounterBeatInterval = this.state.counterBeatInterval + level
      this.setState({
        counterBeatInterval: newCounterBeatInterval
      })
    }
  }

  eliminateBubble() {
    this.setState({
      xMin: null,
      xMax: null,
      yMin: null,
      yMax: null
    })
    this.props.addX(3000)
    this.props.addY(3000)
  }

  eliminateBubble2() {
    this.setState({
      xMin2: null,
      xMax2: null,
      yMin2: null,
      yMax2: null
    })
    this.props.addX2(3000)
    this.props.addY2(3000)
  }

  render() {
    const loading = this.state.loading ? (
      <video className="loading" src="/assets/loading1.mov" autoPlay muted />
    ) : (
      <h1 />
    )
    return (
      <div>
        <div>{loading}</div>
        <div id="border">
          <div className="sidenav" />
          <div className="score">
            <Score />
          </div>
          <div className={this.state.loading ? 'noShow' : 'tvlines'}>
            <div className="webcam-outer">
              <video id="notShow" playsInline ref={this.getVideo} />
              {this.state.time === '' ? (
                <h2 />
              ) : (
                <div id="bubble-container">
                  <Bubble
                    yBubble={this.props.yBubble}
                    xBubble={this.props.xBubble}
                  />
                  <Bubble2
                    yBubble={this.props.yBubble2}
                    xBubble={this.props.xBubble2}
                  />
                </div>
              )}
              <canvas className="webcam" ref={this.getCanvas} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => ({
  xBubble: state.bubble.xCoordinate,
  yBubble: state.bubble.yCoordinate,
  xBubble2: state.bubble.xCoordinate2,
  yBubble2: state.bubble.yCoordinate2,
  selectedSong: state.song.selectedSong,
  danceScore: state.bubble.danceScore,
  level: state.song.level
})

const mapDispatch = dispatch => {
  return {
    addX: num => dispatch(getXCoordinate(num)),
    addY: yBubble => dispatch(getYCoordinate(yBubble)),
    addX2: num => dispatch(getXCoordinate2(num)),
    addY2: yBubble => dispatch(getYCoordinate2(yBubble)),
    addScore: danceScore => dispatch(getDanceScore(danceScore)),
    sendLoadingState: boolean => dispatch(sendLoadingState(boolean))
  }
}

export default connect(mapState, mapDispatch)(PoseNet)

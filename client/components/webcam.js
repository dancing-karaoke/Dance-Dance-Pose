import * as posenet from '@tensorflow-models/posenet'
import React, {Component} from 'react'
import {
  isMobile,
  drawKeypoints,
  drawSkeleton,
  beatsToDisplay,
  beatTimeAbba
} from './utils'
import {defaultProps} from './utils2'
import Bubble from './bubble'
import {connect} from 'react-redux'
import {getXCoordinate, getYCoordinate, getDanceScore} from '../store/bubble'
import Wad from 'web-audio-daw'

// import { beats } from '../../beats';

let counter = 0

class PoseNet extends React.Component {
  static defaultProps = {
    videoWidth: 1400,
    videoHeight: 800,
    flipHorizontal: true,
    algorithm: 'single-pose',
    mobileNetArchitecture: isMobile() ? 0.5 : 1.01,
    showVideo: true,
    showSkeleton: true,
    showPoints: true,
    minPoseConfidence: 0.3,
    minPartConfidence: 0.5,
    maxPoseDetections: 2,
    nmsRadius: 20.0,
    outputStride: 32,
    imageScaleFactor: 0.3,
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
      windowTime: this.props.song.destination.context.currentTime,
      time: 0,
      counterBeatInterval: 0
    }
    this.generateRandomCoordinates = this.generateRandomCoordinates.bind(this)
    this.emilinateBubble = this.eliminateBubble.bind(this)
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
    } catch (e) {
      throw 'This browser does not support video capture, or this device does not have a camera'
    } finally {
      this.setState({loading: false})
    }
    this.net = await posenet.load(this.props.mobileNetArchitecture)
    this.detectPose()
    this.props.onRef(this)
  }

  async setupCamera() {
    // MDN: https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw 'Browser API navigator.mediaDevices.getUserMedia not available'
    }
    const {videoWidth, videoHeight} = this.props
    const video = this.video
    const mobile = isMobile()
    video.width = videoWidth
    video.height = videoHeight

    // MDN: https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        facingMode: 'user',
        width: mobile ? void 0 : videoWidth,
        height: mobile ? void 0 : videoHeight
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

          this.setState({
            xMin: this.props.xBubble * 0.6,
            xMax: this.props.xBubble * 1.4,
            yMin: this.props.yBubble * 0.6,
            yMax: this.props.yBubble * 1.4
          })

          if (
            this.state.xMin < pose.keypoints[10].position.x &&
            pose.keypoints[10].position.x < this.state.xMax &&
            this.state.yMin < pose.keypoints[10].position.y &&
            pose.keypoints[10].position.y < this.state.yMax
            // pose.keypoints[10].score > 0.5
          ) {
            counter++
            this.props.addScore(counter)
            console.log('COUNTER', counter)
            this.eliminateBubble()
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
    const xBubble = Math.random() * 1300
    const yBubble = Math.random() * 800
    this.props.addX(xBubble)
    this.props.addY(yBubble)
  }

  async startTimer() {
    let startTime = new Date()
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
    const beatTime = beatsToDisplay[this.state.counterBeatInterval]
    if (
      this.props.song.destination.context.currentTime - this.state.windowTime >
      beatTime
    ) {
      this.generateRandomCoordinates()
      this.setState({
        counterBeatInterval: this.state.counterBeatInterval + beatTimeAbba
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
    this.props.addX(null)
    this.props.addY(null)
    // this.generateRandomCoordinates()
  }

  render() {
    const loading = this.state.loading ? (
      <div className="PoseNet__loading">{this.props.loadingText}</div>
    ) : (
      ''
    )
    return (
      <div className="PoseNet">
        {loading}
        <video id="notShow" playsInline ref={this.getVideo} />
        {this.state.time === '' ? (
          <h2 />
        ) : (
          <Bubble yBubble={this.props.yBubble} xBubble={this.props.xBubble} />
        )}
        <canvas ref={this.getCanvas} />
      </div>
    )
  }
}

const mapState = state => ({
  xBubble: state.bubble.xCoordinate,
  yBubble: state.bubble.yCoordinate
})

const mapDispatch = dispatch => {
  return {
    addX: num => dispatch(getXCoordinate(num)),
    addY: yBubble => dispatch(getYCoordinate(yBubble)),
    addScore: danceScore => dispatch(getDanceScore(danceScore))
  }
}

export default connect(mapState, mapDispatch)(PoseNet)

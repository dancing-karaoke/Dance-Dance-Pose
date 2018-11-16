import * as posenet from '@tensorflow-models/posenet'
import React, {Component} from 'react'
import {isMobile, drawKeypoints, drawSkeleton} from './utils'
import Bubble from './bubble'
import {connect} from 'react-redux'
import {getXCoordinate, getYCoordinate} from '../store/bubble'

let counter = 0

const KEY = {
  P: 80
}

class PoseNet extends React.Component {
  static defaultProps = {
    videoWidth: 1200,
    videoHeight: 1000,
    flipHorizontal: true,
    algorithm: 'single-pose',
    mobileNetArchitecture: isMobile() ? 0.5 : 1.01,
    showVideo: true,
    showSkeleton: true,
    showPoints: true,
    minPoseConfidence: 0.6,
    minPartConfidence: 0.5,
    maxPoseDetections: 2,
    nmsRadius: 20.0,
    outputStride: 32,
    imageScaleFactor: 0.2,
    skeletonColor: 'aqua',
    skeletonLineWidth: 2,
    scoreThreshold: 0.8,
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
      yMax: 0
    }
    this.generateRandomCoordinates = this.generateRandomCoordinates.bind(this)
    this.emilinateBubble = this.eliminateBubble.bind(this)
    this.handleKeys = this.handleKeys.bind(this)
  }

  handleKeys(value, e) {
    if (e.keyCode === KEY.P && e.type === 'keydown') {
      console.log(
        'COUNTER',
        counter,
        // 'POSE',
        // pose.keypoints[10].position,
        'XMINETC',
        this.state
      )
    }

    let keys = this.state.keys

    if (e.keyCode === KEY.UP || e.keyCode === KEY.W) keys.up = value

    this.setState({
      keys: keys
    })
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
    window.addEventListener('keyup', this.handleKeys.bind(this, false))
    window.addEventListener('keydown', this.handleKeys.bind(this, true))
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
      skeletonLineWidth,
      scoreThreshold
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
            nmsRadius,
            scoreThreshold
          )

          break
        default:
          const pose = await net.estimateSinglePose(
            video,
            imageScaleFactor,
            flipHorizontal,
            outputStride,
            scoreThreshold
          )
          // index 10 is rightWrist
          // index 9 is left Wrist

          this.setState({
            xMin: this.props.xBubble * 0.85,
            xMax: this.props.xBubble * 1.15,
            yMin: this.props.yBubble * 0.85,
            yMax: this.props.yBubble * 1.15
          })

          if (
            this.state.xMin < pose.keypoints[10].position.x < this.state.xMax &&
            this.state.yMin < pose.keypoints[10].position.y < this.state.yMax
          ) {
            counter++
            this.eliminateBubble()
            // this.handleKeys()
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

  eliminateBubble() {
    this.setState({
      xMin: null,
      xMax: null,
      yMin: null,
      yMax: null
    })
    this.props.addX(null)
    this.props.addY(null)
    this.generateRandomCoordinates()
  }

  render() {
    const loading = this.state.loading ? (
      <div className="PoseNet__loading">{this.props.loadingText}</div>
    ) : (
      ''
    )
    // console.log('IN WEBCAM COMP PROPS', this.props, 'STATE', this.state)
    return (
      <div className="PoseNet">
        {loading}
        <video id="notShow" playsInline ref={this.getVideo} />
        <canvas ref={this.getCanvas} />
        <Bubble
          className="bubble"
          render={({x, y}) => (
            <img
              src="http://pngimg.com/uploads/cat/cat_PNG132.png"
              width="100"
              style={{position: 'absolute', top: y, left: x}}
            />
          )}
          generateRandomCoordinates={this.generateRandomCoordinates}
        />
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
    addY: yBubble => dispatch(getYCoordinate(yBubble))
  }
}

export default connect(mapState, mapDispatch)(PoseNet)

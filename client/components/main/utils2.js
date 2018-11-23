import {isMobile, drawKeypoints, drawSkeleton, beatsToDisplay} from './utils'

const KEY = {
  P: 80
}

export const defaultProps = {
  videoWidth: 1200,
  videoHeight: 1000,
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
  imageScaleFactor: 0.2,
  skeletonColor: 'coral',
  skeletonLineWidth: 6,
  loadingText: 'Loading pose detector...'
}

// handleKeys(value, e) {
//   if (e.keyCode === KEY.P && e.type === 'keydown') {
//     console.log('COUNTER', counter, 'STATE', this.state)
//   }
//   let keys = this.state.keys
//   if (e.keyCode === KEY.UP || e.keyCode === KEY.W) keys.up = value
//   this.setState({
//     keys: keys
//   })
// }
// ON COMPONENT DID MOUNT
// window.addEventListener('keyup', this.handleKeys.bind(this, false))
// window.addEventListener('keydown', this.handleKeys.bind(this, true))

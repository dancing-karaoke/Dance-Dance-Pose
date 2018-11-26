import * as posenet from '@tensorflow-models/posenet'
import {drakeBeats, abbaBeats} from '../../../beats'
import redux from 'redux'
import {connect} from 'react-redux'
import react from 'react'
import store from '../../store'

function isAndroid() {
  return /Android/i.test(navigator.userAgent)
}

function isiOS() {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent)
}

export function isMobile() {
  return isAndroid() || isiOS()
}

export function drawKeypoints(
  keypoints,
  minConfidence,
  skeletonColor,
  ctx,
  scale = 1
) {
  keypoints.forEach(keypoint => {
    if (keypoint.score >= minConfidence) {
      const {y, x} = keypoint.position
      ctx.beginPath()
      ctx.arc(x * scale, y * scale, 3, 0, 2 * Math.PI)
      ctx.fillStyle = skeletonColor
      ctx.fill()
    }
  })
}

function toTuple({y, x}) {
  return [y, x]
}

function drawSegment([ay, ax], [by, bx], color, lineWidth, scale, ctx) {
  ctx.beginPath()
  ctx.moveTo(ax * scale, ay * scale)
  ctx.lineTo(bx * scale, by * scale)
  ctx.lineWidth = lineWidth
  ctx.strokeStyle = color
  ctx.stroke()
}

export function drawSkeleton(
  keypoints,
  minConfidence,
  color,
  lineWidth,
  ctx,
  scale = 1
) {
  const adjacentKeyPoints = posenet.getAdjacentKeyPoints(
    keypoints,
    minConfidence
  )

  adjacentKeyPoints.forEach(keypoints => {
    drawSegment(
      toTuple(keypoints[0].position),
      toTuple(keypoints[1].position),
      color,
      lineWidth,
      scale,
      ctx
    )
  })
}

function beatsToBubble(array) {
  // let output = []
  return array.map(x => x.start)
  // return output
}

// export const beatsToDisplay = beatsToBubble(abbaBeats)
export const setBeats = () => {
  const song = store.getState().song.selectedSong
  switch (song) {
    default:
      // return console.log('OTHER')
      return beatsToBubble(abbaBeats)
    case 'dancing-queen':
      return beatsToBubble(abbaBeats)
  }
}

export const setLevel = () => {
  const level = store.getState().song.level
  const abbaEasy = 5
  const abbaMedium = 3
  const abbaChaos = 1
  switch (level) {
    default:
      return abbaEasy
    case 'medium':
      return abbaMedium
    case 'chaos':
      return abbaChaos
  }
}

export const consoleSongandLevel = () => {
  console.log('LEVELAND SONG', store.getState().song)
}
// () => {

// export const assignRange
// this.setState({
//   xMin: this.props.xBubble * (1 - defaultParameters.rangeSpectrum),
//   xMax: this.props.xBubble * (1 + defaultParameters.rangeSpectrum),
//   yMin: this.props.yBubble * (1 - defaultParameters.rangeSpectrum),
//   yMax: this.props.yBubble * (1 + defaultParameters.rangeSpectrum)
// })

export const beatTimeAbba = 1
export const abbaEasy = 5
export const abbaMedium = 3
export const abbaChaos = 1

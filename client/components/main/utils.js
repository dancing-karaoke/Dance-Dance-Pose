import * as posenet from '@tensorflow-models/posenet'
import {drakeBeats, abbaBeats, jacksonBeats} from '../../../beats'
import redux from 'redux'
import {connect} from 'react-redux'
import react from 'react'
import store from '../../store'
import axios from 'axios'

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

// const fetchDancingQueen = async () => {
//   let res = await axios.get('api/songs/1')
//   let song = res.data
//   return song;
// }

// let res = axios.get('api/songs')
// let song = res.data

// const fetchBeatIt = async () => {
//   let res = await axios.get('api/songs/2')
//   let song = res.data
//   return song;
// }

// const dancingQueen = fetchDancingQueen()

function beatsToBubble(array) {
  return array.map(x => x.start)
}

export const setBeats = () => {
  // const dancingQueen = fetchDancingQueen()
  // const beats = dancingQueen.beats
  // console.log('afsdasdadasa', dancingQueen)
  // console.log('ffffffffff', beatsToBubble(abbaBeats))
  const song = store.getState().song.selectedSong
  switch (song) {
    default:
      // console.log('inside', beats)
      return beatsToBubble(abbaBeats)
    case 'dancing-queen':
      // console.log('not default', beats)
      return beatsToBubble(abbaBeats)
    case 'beat-it':
      return beatsToBubble(jacksonBeats)
  }
}

export const setLevel = () => {
  const level = store.getState().song.level
  const song = store.getState().song.selectedSong

  const abbaEasy = 5
  const abbaMedium = 3
  const abbaChaos = 1
  const jacksonEasy = 6
  const jacksonMedium = 4
  const jacksonChaos = 2

  switch (song) {
    default:
      return beatsToBubble(abbaBeats)
    case 'dancing-queen':
      switch (level) {
        default:
          return abbaEasy
        case 'medium':
          return abbaMedium
        case 'chaos':
          return abbaChaos
      }
    case 'beat-it':
      switch (level) {
        default:
          return jacksonEasy
        case 'medium':
          return jacksonMedium
        case 'chaos':
          return jacksonChaos
      }
  }
}

// export const assignRange
// this.setState({
//   xMin: this.props.xBubble * (1 - defaultParameters.rangeSpectrum),
//   xMax: this.props.xBubble * (1 + defaultParameters.rangeSpectrum),
//   yMin: this.props.yBubble * (1 - defaultParameters.rangeSpectrum),
//   yMax: this.props.yBubble * (1 + defaultParameters.rangeSpectrum)
// })

import * as posenet from '@tensorflow-models/posenet'
import {drakeBeats, abbaBeats, jacksonBeats, gagaBeats} from '../../../beats'
import {
  abbaLyrics,
  abbaPitch,
  jacksonPitch,
  jacksonLyrics,
  gagaPitch,
  gagaLyrics
} from '../../../lyrics'
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
  keypoints.forEach(keypoigint => {
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
  const song = store.getState().song.selectedSong
  switch (song) {
    default:
      return beatsToBubble(abbaBeats)
    case 'dancing-queen':
      return beatsToBubble(abbaBeats)
    case 'beat-it':
      const tempBeats = beatsToBubble(jacksonBeats)
      const filteredBeats = tempBeats.filter(beat => beat >= 30)
      const newBeats = filteredBeats.map(beat => beat - 30)
      return newBeats
    case 'gaga':
      return beatsToBubble(gagaBeats)
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

  const gagaEasy = 7
  const gagaMedium = 5
  const gagaChaos = 3

  switch (song) {
    default:
      return beatsToBubble(abbaBeats)
    case 'dancing-queen':
      switch (level) {
        default:
          return abbaEasy
        case 'easy':
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
    case 'gaga':
      switch (level) {
        default:
          return gagaEasy
        case 'medium':
          return gagaMedium
        case 'chaos':
          return gagaChaos
      }
  }
}

export const setLyrics = () => {
  console.log('HIT LYRICS')
  const song = store.getState().song.selectedSong
  switch (song) {
    default:
      return abbaLyrics
    case 'dancing-queen':
      console.log('aba', abbaLyrics)
      return abbaLyrics
    case 'beat-it':
      return jacksonLyrics
    case 'gaga':
      return gagaLyrics
  }
}

export const setPitch = () => {
  const song = store.getState().song.selectedSong
  switch (song) {
    default:
      return abbaPitch
    case 'dancing-queen':
      return abbaPitch
    case 'beat-it':
      return jacksonPitch
    case 'gaga':
      return gagaPitch
  }
}

export const setSong = () => {
  const song = store.getState().song.selectedSong
  switch (song) {
    default:
      return '/songs/dancingqueen.m4a'
    case 'dancing-queen':
      return '/songs/dancingqueen.m4a'
    case 'beat-it':
      return '/songs/beatit.m4a'
    case 'gaga':
      return '/songs/justdance.m4a'
  }
}

// export const assignRange
// this.setState({
//   xMin: this.props.xBubble * (1 - defaultParameters.rangeSpectrum),
//   xMax: this.props.xBubble * (1 + defaultParameters.rangeSpectrum),
//   yMin: this.props.yBubble * (1 - defaultParameters.rangeSpectrum),
//   yMax: this.props.yBubble * (1 + defaultParameters.rangeSpectrum)
// })

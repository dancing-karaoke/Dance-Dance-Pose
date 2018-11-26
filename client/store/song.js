/**
 * ACTION TYPES
 */

const SELECT_SONG = 'SELECT_SONG'
const GET_SINGSCORE = 'GET_SINGSCORE'
const SELECT_LEVEL = 'SELECT_LEVEL'

/**
 * INITIAL STATE
 */
export const initialSongState = {
  selectedSong: '',
  singScore: 0,
  level: ''
}

/**
 * ACTION CREATORS
 */

export const selectSong = selectedSong => ({
  type: SELECT_SONG,
  selectedSong
})

export const getSingScore = singScore => ({
  type: GET_SINGSCORE,
  singScore
})

export const selectLevel = level => ({
  type: SELECT_LEVEL,
  level
})

/**
 * REDUCER
 */

export default function song(state = initialSongState, action) {
  switch (action.type) {
    case SELECT_SONG:
      return {
        ...state,
        selectedSong: action.selectedSong
      }
    case GET_SINGSCORE:
      return {
        ...state,
        singScore: action.singScore
      }
    case SELECT_LEVEL:
      return {
        ...state,
        level: action.level
      }
    default:
      return state
  }
}

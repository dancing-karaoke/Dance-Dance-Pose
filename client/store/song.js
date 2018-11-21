/**
 * ACTION TYPES
 */

const SELECT_SONG = 'SELECT_SONG'
const GET_SINGSCORE = 'GET_SINGSCORE'

/**
 * INITIAL STATE
 */
export const initialSongState = {
  selectedSong: '',
  singScore: 0
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
    default:
      return state
  }
}

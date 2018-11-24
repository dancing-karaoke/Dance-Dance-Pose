/**
 * ACTION TYPES
 */

const SELECT_SONG = 'SELECT_SONG'
const GET_SINGSCORE = 'GET_SINGSCORE'
const SELECT_DIFFICULTY = 'SELECT_DIFFICULTY'

/**
 * INITIAL STATE
 */
export const initialSongState = {
  selectedSong: '',
  singScore: 0,
  difficulty: ''
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

export const selectDifficulty = selectedDifficulty => ({
  type: SELECT_DIFFICULTY,
  selectedDifficulty
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
    case SELECT_DIFFICULTY:
      return {
        ...state,
        selectedDifficulty: action.selectedDifficulty
      }
    default:
      return state
  }
}

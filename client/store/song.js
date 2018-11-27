/**
 * ACTION TYPES
 */

const SELECT_SONG = 'SELECT_SONG'
const SELECT_LEVEL = 'SELECT_LEVEL'

/**
 * INITIAL STATE
 */
export const initialSongState = {
  selectedSong: '',
  level: ''
}

/**
 * ACTION CREATORS
 */

export const selectSong = selectedSong => ({
  type: SELECT_SONG,
  selectedSong
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
    case SELECT_LEVEL:
      return {
        ...state,
        level: action.level
      }
    default:
      return state
  }
}

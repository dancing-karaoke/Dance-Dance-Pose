//Action Types
// const GET_ABBA = 'GET_ABBA'
// const GET_JACKSON = 'GET_JACKSON'
const GET_SONG = 'GET_SONG'

//Initial State
export const songState = {
  selectedSong: ''
}

//Action Creators
// export const getAbba = () => ({type: GET_ABBA})
// export const getJackson = () => ({type: GET_JACKSON})
export const getSong = song => ({type: GET_SONG, song})

export default function songsReducer(state = songState, action) {
  switch (action.type) {
    case GET_SONG:
      return {
        ...state,
        selectedSong: action.song
      }
    default:
      return state
  }
}

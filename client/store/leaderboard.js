import axios from 'axios'

//Action types
const GET_LEADERBOARD = 'GET_LEADERBOARD'
const UPDATE_LEADERBOARD = 'UPDATE_LEADERBOARD'

//Initial State
export const leaderboardState = {
  leaderboard: []
}

//Action Creators
export const getLeaderboard = leaderboard => ({
  type: GET_LEADERBOARD,
  leaderboard
})

export const updateLeaderboard = playerData => ({
  type: UPDATE_LEADERBOARD,
  playerData
})

//Thunk
export const fetchLeaderboard = () => async dispatch => {
  let res = await axios.get('/api/leaderboard')
  let leaderboardData = res.data
  dispatch(getLeaderboard(leaderboardData))
}

export const addPlayerLeaderboard = playerInfo => async dispatch => {
  let res = await axios.post('/api/leaderboard', playerInfo)
  let playerData = res.data
  console.log(playerData)
  dispatch(updateLeaderboard(playerData))
}

//Reducer
export default function leaderboard(state = leaderboardState, action) {
  switch (action.type) {
    case GET_LEADERBOARD:
      return {
        ...state,
        leaderboard: action.leaderboard
      }
    case UPDATE_LEADERBOARD:
      return {
        ...state,
        leaderboard: [...state, action.player]
      }
    default:
      return state
  }
}

import axios from 'axios'

//Action types
const GET_LEADERBOARD = 'GET_LEADERBOARD'

//Initial State
export const leaderboardState = {
  leaderboard: []
}

//Action Creators
export const getLeaderboard = leaderboard => ({
  type: GET_LEADERBOARD,
  leaderboard
})

//Thunk
export const fetchLeaderboard = () => async dispatch => {
  let res = await axios.get('/api/leaderboard')
  let leaderboardData = res.data
  dispatch(getLeaderboard(leaderboardData))
}

//Reducer
export default function leaderboard(state = leaderboardState, action) {
  switch (action.type) {
    case GET_LEADERBOARD:
      return {
        ...state,
        leaderboard: action.leaderboard
      }
    default:
      return state
  }
}

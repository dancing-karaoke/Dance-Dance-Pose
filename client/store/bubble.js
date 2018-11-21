/**
 * ACTION TYPES
 */

const GET_XCOORDINATE = 'GET_XCOORDINATE'
const GET_YCOORDINATE = 'GET_YCOORDINATE'
const GET_DANCESCORE = 'GET_DANCESCORE'

/**
 * INITIAL STATE
 */
export const initialState = {
  xCoordinate: 0,
  yCoordinate: 0,
  danceScore: 0
}

/**
 * ACTION CREATORS
 */

export const getXCoordinate = xCoordinate => ({
  type: GET_XCOORDINATE,
  xCoordinate
})
export const getYCoordinate = yCoordinate => ({
  type: GET_YCOORDINATE,
  yCoordinate
})

export const getDanceScore = danceScore => ({
  type: GET_DANCESCORE,
  danceScore
})

/**
 * REDUCER
 */

export default function bubble(state = initialState, action) {
  switch (action.type) {
    case GET_XCOORDINATE:
      return {
        ...state,
        xCoordinate: action.xCoordinate
      }
    case GET_YCOORDINATE:
      return {
        ...state,
        yCoordinate: action.yCoordinate
      }
    case GET_DANCESCORE:
      return {
        ...state,
        danceScore: action.danceScore
      }
    default:
      return state
  }
}

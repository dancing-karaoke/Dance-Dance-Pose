/**
 * ACTION TYPES
 */

const GET_XCOORDINATE = 'GET_XCOORDINATE'
const GET_YCOORDINATE = 'GET_YCOORDINATE'

/**
 * INITIAL STATE
 */
export const initialState = {
  xCoordinate: 0,
  yCoordinate: 0
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
    default:
      return state
  }
}

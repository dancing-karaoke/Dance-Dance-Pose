/**
 * ACTION TYPES
 */

const GET_XCOORDINATE = 'GET_XCOORDINATE'
const GET_YCOORDINATE = 'GET_YCOORDINATE'
const GET_XCOORDINATE2 = 'GET_XCOORDINATE2'
const GET_YCOORDINATE2 = 'GET_YCOORDINATE2'
const GET_DANCESCORE = 'GET_DANCESCORE'
const GET_SINGSCORE = 'GET_SINGSCORE'

const GET_LOADINGSTATE = 'GET_LOADINGSTATE'

/**
 * INITIAL STATE
 */
export const initialState = {
  xCoordinate: 0,
  yCoordinate: 0,
  xCoordinate2: 0,
  yCoordinate2: 0,
  danceScore: 0,
  singScore: 0,
  loading: true
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

export const getXCoordinate2 = xCoordinate => ({
  type: GET_XCOORDINATE2,
  xCoordinate
})
export const getYCoordinate2 = yCoordinate => ({
  type: GET_YCOORDINATE2,
  yCoordinate
})

export const getDanceScore = danceScore => ({
  type: GET_DANCESCORE,
  danceScore
})
export const getSingScore = singScore => ({
  type: GET_SINGSCORE,
  singScore
})

export const sendLoadingState = boolean => ({
  type: GET_LOADINGSTATE,
  boolean
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
    case GET_XCOORDINATE2:
      return {
        ...state,
        xCoordinate2: action.xCoordinate
      }
    case GET_YCOORDINATE2:
      return {
        ...state,
        yCoordinate2: action.yCoordinate
      }
    case GET_DANCESCORE:
      return {
        ...state,
        danceScore: action.danceScore
      }
    case GET_SINGSCORE:
      return {
        ...state,
        singScore: action.singScore
      }
    case GET_LOADINGSTATE:
      return {
        ...state,
        loading: action.boolean
      }
    default:
      return state
  }
}

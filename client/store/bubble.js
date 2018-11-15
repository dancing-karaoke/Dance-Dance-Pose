const GET_XCOORDINATE = 'GET_XCOORDINATE'
const GET_YCOORDINATE = 'GET_YCOORDINATE'

const initialState = {
  xCoordinate: 0,
  yCoordinate: 0
}

const getxCoordinate = xCoordinate => ({type: GET_XCOORDINATE, xCoordinate})
const getyCoordinate = yCoordinate => ({type: GET_YCOORDINATE, yCoordinate})

export function reducer(state = initialState, action) {
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

export default createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunkMiddleware))
)

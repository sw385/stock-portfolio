import axios from "axios"

// ACTION TYPES
const GET_CURRENT_PRICE = "GET_CURRENT_PRICE"
const GET_OPEN_PRICE = "GET_OPEN_PRICE"

// ACTION CREATORS
/* ** move api keys out ** */

const storeCurrentPrice = (symbol, price) => {
  return {
    type: GET_CURRENT_PRICE,
    payload: symbol, price
  }
}
const storeOpenPrice = (symbol, price) => {
  return {
    type: GET_OPEN_PRICE,
    payload: symbol, price
  }
}

// THUNK CREATORS
export const getCurrentPriceThunk = symbol => async dispatch => {
  try {
    // Query the api for the current price of the symbol
    let apikey = "HA2BAXO7NH22OSEI"
    const data = await axios.get(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apikey}`
    )
    console.log("getCurrentPriceThunk", data)
    let price = data["data"]["Global Quote"]["05. price"]
    dispatch(storeCurrentPrice(symbol, price))
  } catch (error) {
    console.log("Error in getCurrentPriceThunk:", error)
  }
}
export const getOpenPriceThunk = symbol => async dispatch => {
  try {
    // Query the api for the opening price of the symbol
    let apikey = "HA2BAXO7NH22OSEI"
    /*const data = await axios.get(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${apikey}`
    )*/
    const data = await axios.get(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apikey}`
    )
    console.log("getOpenPriceThunk", data)
    let price = data["data"]["Global Quote"]["02. open"]
    dispatch(storeOpenPrice(symbol, price))
  } catch (error) {
    console.log("Error in getOpenPriceThunk:", error)
  }
}

// REDUCER
const reducer = (state = {}, action) => {
  switch (action.type) {
    
    case GET_CURRENT_PRICE:
      // create a new object, copy over everything from state, then add the new price data that was fetched
      return {
        // ...state,
        // officials: action.payload
        state
      }
    case GET_OPEN_PRICE:
      // create a new object, copy over everything from state, then add the new price data that was fetched
      return {
        // ...state,
        // officials: action.payload
        state
      }
    default:
      return state
  }
}

export default reducer
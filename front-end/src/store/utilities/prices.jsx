import axios from "axios"

// ACTION TYPES
const STORE_PRICES = "STORE_PRICES"

// ACTION CREATORS
/* ** move api keys out ** */

const storePrices = (symbol, open_price, current_price) => {
  return {
    type: STORE_PRICES,
    payload: [symbol, open_price, current_price]
  }
}

// THUNK CREATORS
export const getPricesThunk = symbol => async dispatch => {
  try {
    // Query the api for the current price of the symbol
    let apikey = "HA2BAXO7NH22OSEI"
    symbol = symbol.toUpperCase()
    const data = await axios.get(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apikey}`
    )
    console.log("getPricesThunk", data)
    let current_price = data["data"]["Global Quote"]["05. price"]
    let open_price = data["data"]["Global Quote"]["02. open"]
    dispatch(storePrices(symbol, open_price, current_price))
  } catch (error) {
    console.log("Error in getPricesThunk:", error)
  }
}

// REDUCER
const reducer = (state = {}, action) => {
  switch (action.type) {
    
    case STORE_PRICES:
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
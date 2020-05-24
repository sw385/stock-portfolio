import axios from "axios"

// ACTION TYPES
const STORE_PRICES = "STORE_PRICES"

// ACTION CREATORS
/* ** move api keys out ** */

const storePrices = (dataObject) => {
  // dataObject is an Object
  // where keys are stock ticker symbols
  // and values are arrays [openPrice, currentPrice]
  return {
    type: STORE_PRICES,
    payload: dataObject,
  }
}

// THUNK CREATORS
export const getPricesThunk = (symbols) => async (dispatch) => {
  try {
    console.log(symbols)
    let symbolsUpper = []
    for (var i = 0; i < symbols.length; i++) {
      symbolsUpper.push(symbols[i].toUpperCase())
    }
    let symbolsString = symbolsUpper.join(",")
    console.log(symbolsString)
    // Query the api for the current price of the symbol
    // let apikey = "HA2BAXO7NH22OSEI"
    // symbol = symbol.toUpperCase()
    /*
    const data = await axios.get(
      `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apikey}`
    )*/
    /*const data = await axios.get(
      `https://cloud.iexapis.com/stable/stock/market/batch?token=pk_a8f41bb7afc04a25b8dfd124cec4ba23&symbols=aapl,fb,tsla&types=quote,news,chart&range=1m&last=5`
    )*/
    /*const data = await axios.get(
      `https://sandbox.iexapis.com/stable/stock/market/batch?token=Tpk_5c10e32528e44bdfbb34c2dca87cc0af&symbols=aapl,fb,tsla&types=quote,news,chart&range=1m&last=5`
    )*/
    const data = await axios.get(
      `https://cloud.iexapis.com/stable/stock/market/batch?token=pk_a8f41bb7afc04a25b8dfd124cec4ba23&symbols=${symbolsString}&types=quote`
    )
    console.log("getPricesThunk", data["data"])
    // let current_price = data["data"]["Global Quote"]["05. price"]
    // let open_price = data["data"]["Global Quote"]["02. open"]
    let dataObject = {}
    for (let symbol in data["data"]) {
      dataObject[symbol] = [
        data["data"][symbol]["quote"]["open"],
        data["data"][symbol]["quote"]["latestPrice"],
      ]
      //console.log(key)
      //console.log(data["data"][key]["quote"]["open"])
      //console.log(data["data"][key]["quote"]["latestPrice"])
    }
    console.log(dataObject)
    dispatch(storePrices(dataObject))
  } catch (error) {
    console.log("Error in getPricesThunk:", error)
  }
}

// REDUCER
const pricesReducer = (state = {}, action) => {
  switch (action.type) {
    case STORE_PRICES:
      // create a new object, copy over everything from state, then add/overwrite the new price data that was fetched
      return {
        // ...state,
        // officials: action.payload

        // ...state, ...action.payload
        ...state,
        prices: { ...state["prices"], ...action.payload },
      }
    default:
      // return state
      return {
        transactions: [
          { datetime: "2020-01-01", symbol: "SPOT", shares: 75, side: "BUY" },
          { datetime: "2020-02-01", symbol: "SPOT", shares: 25, side: "SELL" },
          { datetime: "2020-03-01", symbol: "SPOT", shares: 35, side: "BUY" },
          { datetime: "2020-04-01", symbol: "SPOT", shares: 45, side: "SELL" },
        ],
        holdings: [
          { symbol: "ABC", shares: 21 },
          { symbol: "CIA", shares: 22 },
          { symbol: "FBI", shares: 23 },
          { symbol: "NSA", shares: 24 },
          { symbol: "TLA", shares: 25 },
          { symbol: "FED", shares: 26 },
        ],
        prices: { MEOW: [12, 24] },
      }
  }
}

export default pricesReducer

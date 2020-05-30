import axios from "axios"

// ACTION TYPES
const STORE_PRICES = "STORE_PRICES"
const STORE_TRANSACTIONS = "STORE_TRANSACTIONS"
const STORE_PORTFOLIO = "STORE_PORTFOLIO"

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

const storeTransactions = (dataObject) => {
  // dataObject is an Object
  // containing the balance and an array of transactions
  return {
    type: STORE_TRANSACTIONS,
    payload: dataObject,
  }
}

const storePortfolio = (dataObject) => {
  // dataObject is an Object
  // containing the balance and an array of holdings called portfolio
  return {
    type: STORE_PORTFOLIO,
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
        data["data"][symbol]["quote"]["open"].toFixed(2),
        data["data"][symbol]["quote"]["latestPrice"].toFixed(2),
        data["data"][symbol]["quote"]["companyName"]
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

export const getTransactionsThunk = (username) => async (dispatch) => {
  try {
    const data = await axios.get(
      `http://localhost:3001/${username}/transactions`
    )
    let dataObject = data["data"]
    console.log("getTransactionsThunk", dataObject)
    dispatch(storeTransactions(dataObject))
  } catch (error) {
    console.log("Error in getTransactionsThunk:", error)
  }
}

export const getPortfolioThunk = (username) => async (dispatch) => {
  try {
    const data = await axios.get(`http://localhost:3001/${username}/portfolio`)
    let dataObject = data["data"]
    console.log("getPortfolioThunk", dataObject)
    dispatch(storePortfolio(dataObject))
  } catch (error) {
    console.log("Error in getPortfolioThunk:", error)
  }
}

// REDUCER
const pricesReducer = (state = {}, action) => {
  console.log("kiwi", action.payload)
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
    case STORE_TRANSACTIONS:
      return {
        ...state,
        transactions: action.payload.transactions,
        balance: action.payload.balance,
      }
    case STORE_PORTFOLIO:
      return {
        ...state,
        portfolio: action.payload.portfolio,
        balance: action.payload.balance,
      }
    default:
      // return state
      return {
        transactions: [
          {
            datetime: "2020-01-01",
            symbol: "SPOT",
            shares: 75,
            is_buy: true,
            price: 145,
          },
          {
            datetime: "2020-02-01",
            symbol: "SPOT",
            shares: 25,
            is_buy: false,
            price: 140,
          },
          {
            datetime: "2020-03-01",
            symbol: "SPOT",
            shares: 35,
            is_buy: true,
            price: 155,
          },
          {
            datetime: "2020-04-01",
            symbol: "SPOT",
            shares: 45,
            is_buy: false,
            price: 160,
          },
        ],
        portfolio: [
          { symbol: "SPOT", shares: 21 },
          { symbol: "BA", shares: 22 },
          { symbol: "GOOG", shares: 23 },
          { symbol: "TDOC", shares: 24 },
          { symbol: "V", shares: 25 },
        ],
        prices: { MEOW: [12, 24] },
      }
  }
}

export default pricesReducer

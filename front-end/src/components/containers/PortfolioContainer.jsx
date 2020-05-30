import React, { Component } from "react"
import { connect } from "react-redux"
// import { action } from "../../store/utilities/Representative"; // Get the action creator for ____?
import PortfolioView from "../views/PortfolioView"
import {
  getPricesThunk,
  getPortfolioThunk,
  buyStockThunk,
  sellStockThunk,
} from "../../store/utilities/prices"

class PortfolioContainer extends Component {
  constructor(props) {
    super(props)

    // this.props.buyStockThunk("alice123", "PYPL", 15, 2)
    // this.props.sellStockThunk("alice123", "PYPL", 5, 2)

    this.props.getPortfolioThunk("alice123").then(() => {
      let symbols = []
      for (let i = 0; i < this.props.portfolio.length; i++) {
        symbols.push(this.props.portfolio[i]["symbol"])
      }
      // console.log("yes", symbols)
      this.props.getPricesThunk(symbols)
    })
  }

  render() {
    return (
      <div>
        PortfolioContainer here
        <PortfolioView
          holdings={this.props.portfolio}
          prices={this.props.prices}
        />
      </div>
    )
  }
}

const mapState = (state) => {
  console.log(state)
  return {
    portfolio: state.pricesReducer.portfolio,
    prices: state.pricesReducer.prices,
  }
}

const mapDispatch = (dispatch) => {
  return {
    getPricesThunk: (symbols) => dispatch(getPricesThunk(symbols)),
    getPortfolioThunk: (username) => dispatch(getPortfolioThunk(username)),
    buyStockThunk: (username, symbol, shares, price) =>
      dispatch(buyStockThunk(username, symbol, shares, price)),
    sellStockThunk: (username, symbol, shares, price) =>
      dispatch(sellStockThunk(username, symbol, shares, price)),
  }
}

export default connect(mapState, mapDispatch)(PortfolioContainer)

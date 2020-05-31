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
import jwtDecode from "jwt-decode"

class PortfolioContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      buySymbol: "",
      buyShares: 1,
      sellSymbol: "",
      sellShares: 1,
      currentUser: jwtDecode(localStorage.getItem("jwtToken")).username,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

    // this.props.buyStockThunk(this.props.currentUser, "PYPL", 15, 2)
    // this.props.sellStockThunk(this.props.currentUser, "PYPL", 5, 2)
    console.log("lime", this.state.currentUser)
    this.props.getPortfolioThunk(this.state.currentUser).then(() => {
      let symbols = []
      for (let i = 0; i < this.props.portfolio.length; i++) {
        symbols.push(this.props.portfolio[i]["symbol"])
      }
      // console.log("yes", symbols)
      this.props.getPricesThunk(symbols)
    })
  }

  handleChange(event) {
    if (event.target.name == "buySymbol" || event.target.name == "sellSymbol") {
      this.setState({ [event.target.name]: event.target.value.toUpperCase() })
    } else {
      this.setState({ [event.target.name]: event.target.value })
    }
    console.log(this.state)
  }

  handleSubmit(event) {
    event.preventDefault()
  }

  render() {
    return (
      <div>
        PortfolioContainer here
        <form>
          <label>
            Symbol:
            <input
              type="text"
              name="buySymbol"
              maxLength="6"
              value={this.state.buySymbol}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Number of shares to buy:
            <input
              type="number"
              id="buyShares"
              name="buyShares"
              min="1"
              value={this.state.buyShares}
              onChange={this.handleChange}
            ></input>
          </label>
          <input type="submit" value="Buy" />
        </form>
        <form>
          <label>
            Symbol:
            <input
              type="text"
              name="sellSymbol"
              maxLength="6"
              value={this.state.sellSymbol}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Number of shares to buy:
            <input
              type="number"
              id="sellShares"
              name="sellShares"
              min="1"
              value={this.state.sellShares}
              onChange={this.handleChange}
            ></input>
          </label>
          <input type="submit" value="Sell" />
        </form>
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
    // currentUser: state.pricesReducer.username,
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

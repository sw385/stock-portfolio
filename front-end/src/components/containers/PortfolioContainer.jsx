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

    let decodedUser = ""
    if (localStorage.getItem("jwtToken") !== null) {
      const jwtToken = localStorage.getItem("jwtToken")
      if (jwtToken !== "undefined" && jwtToken !== "") {
        decodedUser = jwtDecode(localStorage.getItem("jwtToken")).username
      }
    }

    this.state = {
      buySymbol: "",
      buyShares: 1,
      sellSymbol: "",
      sellShares: 1,
      currentUser: decodedUser,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleBuy = this.handleBuy.bind(this)
    this.handleSell = this.handleSell.bind(this)

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
      this.setState({
        [event.target.name]: event.target.value
          .toUpperCase()
          .replace(/\s+/g, "")
          .replace(/[0-9]/g, ""),
      })
    } else {
      this.setState({ [event.target.name]: event.target.value })
    }
    console.log(this.state)
  }

  handleBuy(event) {
    event.preventDefault()
    this.props
      .getPortfolioThunk(this.state.currentUser)
      .then(() => {
        let symbols = []
        for (let i = 0; i < this.props.portfolio.length; i++) {
          symbols.push(this.props.portfolio[i]["symbol"])
        }
        // console.log("yes", symbols)
        this.props.getPricesThunk(symbols)
      })
      .then(() => {
        this.props
          .buyStockThunk(
            this.state.currentUser,
            this.state.buySymbol,
            this.state.buyShares
          )
          .then(() => {
            this.props.getPortfolioThunk(this.state.currentUser).then(() => {
              let symbols = []
              for (let i = 0; i < this.props.portfolio.length; i++) {
                symbols.push(this.props.portfolio[i]["symbol"])
              }
              // console.log("yes", symbols)
              this.props.getPricesThunk(symbols)
            })
          })
      })
  }

  handleSell(event) {
    event.preventDefault()
    this.props
      .getPortfolioThunk(this.state.currentUser)
      .then(() => {
        let symbols = []
        for (let i = 0; i < this.props.portfolio.length; i++) {
          symbols.push(this.props.portfolio[i]["symbol"])
        }
        // console.log("yes", symbols)
        this.props.getPricesThunk(symbols)
      })
      .then(() => {
        this.props
          .sellStockThunk(
            this.state.currentUser,
            this.state.sellSymbol,
            this.state.sellShares
          )
          .then(() => {
            this.props.getPortfolioThunk(this.state.currentUser).then(() => {
              let symbols = []
              for (let i = 0; i < this.props.portfolio.length; i++) {
                symbols.push(this.props.portfolio[i]["symbol"])
              }
              // console.log("yes", symbols)
              this.props.getPricesThunk(symbols)
            })
          })
      })
  }

  render() {
    let options = []
    for (let i = 0; i < this.props.portfolio.length; i++) {
      options.push(<option value={this.props.portfolio[i]["symbol"]}>{this.props.portfolio[i]["symbol"]}</option>)
    }

    return localStorage.getItem("jwtToken") !== null &&
      localStorage.getItem("jwtToken") !== "" ? (
      <div>
        <p>Available balance: ${this.props.balance}</p>
        <form onSubmit={this.handleBuy}>
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
        <form onSubmit={this.handleSell}>
          <label>
            Symbol:
            <select
              name="sellSymbol"
              value={this.state.sellSymbol}
              onChange={this.handleChange}
            >
              {options}
            </select>
          </label>
          <label>
            Number of shares to sell:
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
    ) : (
      <div></div>
    )
  }
}

const mapState = (state) => {
  console.log(state)
  return {
    portfolio: state.pricesReducer.portfolio,
    prices: state.pricesReducer.prices,
    // currentUser: state.pricesReducer.username,
    balance: state.pricesReducer.balance,
  }
}

const mapDispatch = (dispatch) => {
  return {
    getPricesThunk: (symbols) => dispatch(getPricesThunk(symbols)),
    getPortfolioThunk: (username) => dispatch(getPortfolioThunk(username)),
    buyStockThunk: (username, symbol, shares) =>
      dispatch(buyStockThunk(username, symbol, shares)),
    sellStockThunk: (username, symbol, shares) =>
      dispatch(sellStockThunk(username, symbol, shares)),
  }
}

export default connect(mapState, mapDispatch)(PortfolioContainer)

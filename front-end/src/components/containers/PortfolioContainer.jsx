import React, { Component } from "react"
import { connect } from "react-redux"
// import { action } from "../../store/utilities/Representative"; // Get the action creator for ____?
import PortfolioView from "../views/PortfolioView"
import { getPricesThunk } from "../../store/utilities/prices"

class PortfolioContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    let symbols = []
    for (let i = 0; i < this.props.holdings.length; i++) {
      symbols.push(this.props.holdings[i]["symbol"])
    }
    // console.log(symbols)
    this.props.getPricesThunk(symbols)
  }

  render() {
    console.log("mango")
    return (
      <div>
        PortfolioContainer here

        <PortfolioView holdings={this.props.holdings} prices={this.props.prices}/>
      </div>
    )
  }
}

const mapState = (state) => {
  console.log(state)
  return {
    holdings: state.pricesReducer.holdings,
    prices: state.pricesReducer.prices,
  }
}

const mapDispatch = (dispatch) => {
  return {
    getPricesThunk: (symbols) => dispatch(getPricesThunk(symbols)),
  }
}

export default connect(mapState, mapDispatch)(PortfolioContainer)

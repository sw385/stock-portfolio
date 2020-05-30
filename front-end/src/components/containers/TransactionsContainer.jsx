import React, { Component } from "react"
import { connect } from "react-redux"
// import { action } from "../../store/utilities/Representative"; // Get the action creator for ____?
import TransactionsView from "../views/TransactionsView"
import { getTransactionsThunk } from "../../store/utilities/prices"

class TransactionsContainer extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.getTransactionsThunk("alice123")
  }

  render() {
    return (
      <div>
        TransactionsContainer here
        <TransactionsView transactions={this.props.transactions} />
      </div>
    )
  }
}

const mapState = (state) => {
  // console.log(state)
  return {
    transactions: state.pricesReducer.transactions,
  }
}

const mapDispatch = (dispatch) => {
  return {
    getTransactionsThunk: (username) =>
      dispatch(getTransactionsThunk(username)),
  }
}

export default connect(mapState, mapDispatch)(TransactionsContainer)

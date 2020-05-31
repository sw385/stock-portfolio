import React, { Component } from "react"
import { connect } from "react-redux"
// import { action } from "../../store/utilities/Representative"; // Get the action creator for ____?
import TransactionsView from "../views/TransactionsView"
import { getTransactionsThunk } from "../../store/utilities/prices"
import jwtDecode from "jwt-decode"

class TransactionsContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentUser: jwtDecode(localStorage.getItem("jwtToken")),
    }
    this.props.getTransactionsThunk(this.state.currentUser)
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
    // currentUser: state.pricesReducer.username,
  }
}

const mapDispatch = (dispatch) => {
  return {
    getTransactionsThunk: (username) =>
      dispatch(getTransactionsThunk(username)),
  }
}

export default connect(mapState, mapDispatch)(TransactionsContainer)

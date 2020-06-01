import React, { Component } from "react"
import PropTypes from "prop-types"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import { connect } from "react-redux"
import jwtDecode from "jwt-decode"
import { withRouter } from "react-router"

import "../views/Navbar.css"

class Navbar extends Component {
  constructor(props) {
    super(props)
    let decodedUser = ""
    if (localStorage.getItem("jwtToken") !== null) {
      const jwtToken = localStorage.getItem("jwtToken")
      if (jwtToken !== "undefined" && jwtToken !== "") {
        decodedUser = jwtDecode(localStorage.getItem("jwtToken")).username
      }
    }
    this.state = { currentUser: decodedUser }

    this.removeToken = this.removeToken.bind(this)
  }

  removeToken() {
    localStorage.setItem("jwtToken", "")
    this.props.history.push("/signin")
  }

  render() {
    let currentUser = ""
    if (localStorage.getItem("jwtToken") !== null) {
      const jwtToken = localStorage.getItem("jwtToken")
      if (jwtToken !== "undefined" && jwtToken !== "") {
        currentUser = jwtDecode(localStorage.getItem("jwtToken")).username
      }
    }
    return (
      <div class="navbar">
        {/*
      <Link to="/signin">Sign In</Link>
      <Link to="/register">Register</Link>
      <Link to="/portfolio">Portfolio</Link>
      <Link to="/transactions">Transactions</Link>
      */}

        {localStorage.getItem("jwtToken") !== null &&
        localStorage.getItem("jwtToken") !== "undefined" &&
        localStorage.getItem("jwtToken") !== "" ? (
          <div>
            <p class="welcome">Welcome, {currentUser}</p>
            <a href="/portfolio">Portfolio</a>
            <a href="/transactions">Transactions</a>

            {/*<Link to="/" onClick={() => console.log("Heading to /")} />*/}
            <Router>
              <Link to="/signin" onClick={() => this.removeToken()}>
                Log Out
              </Link>
            </Router>
          </div>
        ) : (
          <div>
            <a href="/register">Register</a>
            <a href="/signin">Sign In</a>
          </div>
        )}
      </div>
    )
  }
}

const mapState = (state) => {
  console.log(state)
  return {}
}

const mapDispatch = (dispatch) => {
  return {}
}
export default withRouter(Navbar)

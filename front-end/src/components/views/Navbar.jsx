import React from "react"
import PropTypes from "prop-types"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import jwtDecode from "jwt-decode"

// import "../views/Navbar.css";

const Navbar = (props) => {

  let decodedUser = ""
  if (localStorage.getItem("jwtToken") !== null) {
    const jwtToken = localStorage.getItem("jwtToken");
    if (jwtToken !== "undefined" && jwtToken !== "") {
      decodedUser = jwtDecode(localStorage.getItem("jwtToken")).username
    }
  }

  let currentUser = decodedUser

  function removeToken() {
    localStorage.setItem("jwtToken", "")
  }

  return (
    <div>
      Navbar here
      {/*
      <Link to="/signin">Sign In</Link>
      <Link to="/register">Register</Link>
      <Link to="/portfolio">Portfolio</Link>
      <Link to="/transactions">Transactions</Link>
      */}
      <p>Welcome, {currentUser}</p>
      <p>Available balance: {currentUser}</p>
      <a href="/register">Register</a>
      <a href="/signin">Sign In</a>
      
      <a href="/portfolio">Portfolio</a>
      <a href="/transactions">Transactions</a>
      <a href="#">Log Out</a>
    </div>
  )
}

export default Navbar

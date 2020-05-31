import React from "react"
import PropTypes from "prop-types"
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"

// import "../views/Navbar.css";

const Navbar = (props) => {
  return (
    <div>
      Navbar here
      {/*
      <Link to="/signin">Sign In</Link>
      <Link to="/register">Register</Link>
      <Link to="/portfolio">Portfolio</Link>
      <Link to="/transactions">Transactions</Link>
      */}
      <a href="/register">Register</a>
      <a href="/signin">Sign In</a>
      <a href="/portfolio">Portfolio</a>
      <a href="/transactions">Transactions</a>
    </div>
  )
}

// StudentCard.propTypes = {
//   image: PropTypes.string.isRequired,
//   firstName: PropTypes.string.isRequired,
//   lastName: PropTypes.string.isRequired,
//   campus: PropTypes.string.isRequired,
//   onClick: PropTypes.func.isRequired,
//   buttonText: PropTypes.string.isRequired
// };

export default Navbar

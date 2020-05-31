import React, { Component } from "react"
import { connect } from "react-redux"
// import { action } from "../../store/utilities/Representative"; // Get the action creator for ____?
import SignInView from "../views/SignInView"
import { login } from "../../store/utilities/prices"

class SignInContainer extends Component {
  constructor(props) {
    super(props)
    this.state = { email: "", password: "" }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
    console.log(this.state)
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.login(this.state.email, this.state.password)
  }

  render() {
    return (
      <div>
        SignInContainer here
        <form onSubmit={this.handleSubmit}>
          <label>
            E-mail address:
            <input
              type="text"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Password:
            <input
              type="text"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Sign in" />
        </form>
      </div>
    )
  }
}

const mapState = (state) => {
  return {}
}

const mapDispatch = (dispatch) => {
  return {
    login: (user_email, password) =>
      dispatch(login(user_email, password)),
  }
}

export default connect(mapState, mapDispatch)(SignInContainer)

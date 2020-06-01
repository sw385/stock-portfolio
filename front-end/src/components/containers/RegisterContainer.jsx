import React, { Component } from "react"
import { connect } from "react-redux"
// import { action } from "../../store/utilities/Representative"; // Get the action creator for ____?
import RegisterView from "../views/RegisterView"
import { register } from "../../store/utilities/prices"

class RegisterContainer extends Component {
  constructor(props) {
    super(props)
    this.state = { username: "", email: "", password: "" }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    if (event.target.name != "password") {
      this.setState({ [event.target.name]: event.target.value.trim() })
    } else {
      this.setState({ [event.target.name]: event.target.value })
    }

    // console.log(this.state)
  }

  handleSubmit(event) {
    event.preventDefault()
    // console.log("apple")
    this.props.register(
      this.state.username,
      this.state.email,
      this.state.password
    )
  }

  render() {
    return (
      <div>
        RegisterContainer here
        <form onSubmit={this.handleSubmit}>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </label>
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
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Register" />
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
    register: (username, user_email, password) =>
      dispatch(register(username, user_email, password)),
  }
}

export default connect(mapState, mapDispatch)(RegisterContainer)

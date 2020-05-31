import React, { Component } from "react"
import { connect } from "react-redux"
// import { action } from "../../store/utilities/Representative"; // Get the action creator for ____?
import RegisterView from "../views/RegisterView"

class RegisterContainer extends Component {
  constructor(props) {
    super(props)
    this.state = { username: "", email: "", password: "" }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
    console.log(this.state)
  }

  handleSubmit(event) {
    event.preventDefault()
  }

  render() {
    return (
      <div>
        RegisterContainer here
        <form>
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
              type="text"
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
  return {}
}

export default connect(mapState, mapDispatch)(RegisterContainer)

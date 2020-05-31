import React, { Component } from "react";
import { connect } from "react-redux";
// import { action } from "../../store/utilities/Representative"; // Get the action creator for ____?
import SignInView from "../views/SignInView";

class SignInContainer extends Component {
  constructor(props) {
    super(props);
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
  }

  render() {
    return (
      <div>
        SignInContainer here
        <form>
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
    );
  }
}

const mapState = state => {
  return {};
};

const mapDispatch = dispatch => {
  return {};
};

export default connect(mapState, mapDispatch)(SignInContainer);

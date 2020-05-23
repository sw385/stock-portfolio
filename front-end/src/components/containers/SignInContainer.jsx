import React, { Component } from "react";
import { connect } from "react-redux";
// import { action } from "../../store/utilities/Representative"; // Get the action creator for ____?
import SignInView from "../views/SignInView";

class SignInContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        SignInContainer here
        <SignInView />
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

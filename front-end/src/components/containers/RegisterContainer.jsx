import React, { Component } from "react";
import { connect } from "react-redux";
// import { action } from "../../store/utilities/Representative"; // Get the action creator for ____?
import RegisterView from "../views/RegisterView";

class RegisterContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        RegisterContainer here
        <RegisterView />
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

export default connect(mapState, mapDispatch)(RegisterContainer);

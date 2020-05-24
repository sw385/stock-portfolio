import React, { Component } from "react";
import { connect } from "react-redux";
// import { action } from "../../store/utilities/Home"; // Get the action creator for ____?
import HomeView from "../views/HomeView";
import {
  getCurrentPriceThunk,
  getOpenPriceThunk
} from "../../store/utilities/prices";

class HomeContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    this.props.getCurrentPriceThunk("mmm");
    this.props.getOpenPriceThunk("mmm");
  };

  render() {
    return (
      <div>
        HomeContainer here
        <HomeView />
      </div>
    );
  }
}

/*
const mapState = state => {
  return {};
};

const mapDispatch = dispatch => {
  return {};
};

export default connect(mapState, mapDispatch)(HomeContainer);
*/



const mapState = state => {
  console.log(state);
  return {
    // photo: state.official,
    // store: state.official.officials
  };
};

const mapDispatch = dispatch => {
  return {
    getCurrentPriceThunk: symbol =>
      dispatch(getCurrentPriceThunk(symbol)),
    getOpenPriceThunk: symbol => dispatch(getOpenPriceThunk(symbol))
  };
};

export default connect(mapState, mapDispatch)(HomeContainer);

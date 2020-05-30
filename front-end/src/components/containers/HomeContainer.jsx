import React, { Component } from "react";
import { connect } from "react-redux";
// import { action } from "../../store/utilities/Home"; // Get the action creator for ____?
import HomeView from "../views/HomeView";
import { getPricesThunk } from "../../store/utilities/prices";

class HomeContainer extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    //this.props.getPricesThunk("SPOT");
    //this.props.getPricesThunk("mmm");
    //this.props.getPricesThunk("atvi");
    this.props.getPricesThunk(["spot", "mmm", "atvi"]);
    this.props.getPricesThunk(["tsla", "amzn", "atvi"]);
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
  // console.log(state);
  return {
    // photo: state.official,
    // store: state.official.officials
  };
};

const mapDispatch = dispatch => {
  return {
    getPricesThunk: symbols =>
      dispatch(getPricesThunk(symbols)),
  };
};

export default connect(mapState, mapDispatch)(HomeContainer);

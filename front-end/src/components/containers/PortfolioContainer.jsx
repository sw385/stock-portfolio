import React, { Component } from "react";
import { connect } from "react-redux";
// import { action } from "../../store/utilities/Representative"; // Get the action creator for ____?
import PortfolioView from "../views/PortfolioView";

class PortfolioContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        PortfolioContainer here
        <PortfolioView holdings={this.props.holdings}/>
      </div>
    );
  }
}

const mapState = state => {
  console.log(state)
  return {
    holdings: state.pricesReducer.holdings,
  }
}

const mapDispatch = dispatch => {
  return {};
};

export default connect(mapState, mapDispatch)(PortfolioContainer);

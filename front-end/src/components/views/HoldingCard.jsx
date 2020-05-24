import React from "react"
import PropTypes from "prop-types"

import "../views/HoldingCard.css";

const HoldingCard = (props) => {
  return (
    <div class="holding-card">
      HoldingCard here
      <p>Ticker: {props.data.symbol}</p>
      <p>{props.data.shares} shares</p>
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

export default HoldingCard

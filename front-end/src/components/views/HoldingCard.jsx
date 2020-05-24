import React from "react"
import PropTypes from "prop-types"

import "../views/HoldingCard.css";

const HoldingCard = (props) => {
  let colorClass = "gray"
  if (props.price[1] < props.price[0]) {
    colorClass = "red"
  }
  else if (props.price[1] > props.price[0]) {
    colorClass = "green"
  }
  return (
    <div class="holding-card">
      HoldingCard here
      <p>Symbol: {props.data.symbol}</p>
      <p>{props.data.shares} shares</p>
      <p>Open price: ${props.price[0]}</p>
      <p class={colorClass}>Current price: ${props.price[1]}</p>
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

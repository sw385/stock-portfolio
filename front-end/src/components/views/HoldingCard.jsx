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
      <p class={colorClass + " symbol"}>{props.data.symbol}</p>
      <p class="company-name">{props.price[2]}</p>
      <p>{props.data.shares} share(s)</p>
      <p>Open price: ${props.price[0]}</p>
      <p class={colorClass + " current"}>Current price: ${props.price[1]}</p>
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

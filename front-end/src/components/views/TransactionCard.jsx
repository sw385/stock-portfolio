import React from "react"
import PropTypes from "prop-types"

import "../views/TransactionCard.css";

const TransactionCard = (props) => {
  let side = ""
  if (props.data.is_buy) {
    side = "Buy"
  }
  else {
    side = "Sell"
  }
  return (
    <div class="transaction-card">
      TransactionCard here
      <p>Datetime: {props.data.datetime}</p>
      <p>Symbol: {props.data.symbol}</p>
      <p>Shares: {props.data.shares}</p>
      <p>Price: {props.data.price}</p>
      <p>Side: {side}</p>
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

export default TransactionCard

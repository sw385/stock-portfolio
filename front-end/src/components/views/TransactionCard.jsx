import React from "react"
import PropTypes from "prop-types"

import "../views/TransactionCard.css";

const TransactionCard = (props) => {
  return (
    <div class="transaction-card">
      TransactionCard here
      <p>Datetime: {props.data.datetime}</p>
      <p>Symbol: {props.data.symbol}</p>
      <p>Shares: {props.data.shares}</p>
      <p>Side: {props.data.side}</p>
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

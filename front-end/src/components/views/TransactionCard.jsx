import React from "react"
import PropTypes from "prop-types"

import "../views/TransactionCard.css"

const TransactionCard = (props) => {
  let side = ""
  if (props.data.is_buy) {
    side = "Bought"
  } else {
    side = "Sold"
  }
  return (
    <div class="transaction-card">
      <p>Datetime: {props.data.datetime}</p>
      <p>
        {side} {props.data.shares} {props.data.shares == 1 ? "share" : "shares"}
      </p>
      <p> {props.data.symbol}</p>
      <p>@ ${props.data.price}</p>
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

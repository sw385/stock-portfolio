import React from "react"
import TransactionCard from "./TransactionCard"

// If you need cards or styling, you can uncomment the lines here to import
// import "./TransactionsView.css";

const TransactionsView = (props) => {
  let transactionCards = []
  if (props.transactions) {
    for (let i = 0; i < props.transactions.length; i++) {
      transactionCards.push(<TransactionCard data={props.transactions[i]} />)
    }
  }
  return (
    <div>
      {localStorage.getItem("jwtToken") !== null &&
      localStorage.getItem("jwtToken") !== "" ? (
        transactionCards
      ) : (
        <div></div>
      )}
    </div>
  )
}

export default TransactionsView

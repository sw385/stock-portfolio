import React from "react"
import { CSVLink, CSVDownload } from "react-csv"
import TransactionCard from "./TransactionCard"

// If you need cards or styling, you can uncomment the lines here to import
import "./TransactionsView.css";

const TransactionsView = (props) => {
  let transactionCards = []
  if (props.transactions) {
    for (let i = 0; i < props.transactions.length; i++) {
      transactionCards.push(<TransactionCard data={props.transactions[i]} />)
    }
  }

  const csvData = [
    props.transactions
  ]

  return (
    <div>
      {localStorage.getItem("jwtToken") !== null &&
      localStorage.getItem("jwtToken") !== "" ? (
        <div>
          <CSVLink filename="transactions_data.csv" data={props.transactions} headers={[`datetime`, `symbol`, `shares`, `is_buy`]}>Export as CSV</CSVLink>{transactionCards}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  )
}

export default TransactionsView

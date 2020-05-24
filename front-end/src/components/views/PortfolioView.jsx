import React from "react"
import HoldingCard from "./HoldingCard"

// If you need cards or styling, you can uncomment the lines here to import
// import "./PortfolioView.css";

const PortfolioView = (props) => {
  console.log("kiwi", props.holdings)
  let HoldingCards = []
  if (props.holdings) {
    for (let i = 0; i < props.holdings.length; i++) {
      HoldingCards.push(<HoldingCard data={props.holdings[i]} />)
    }
  }
  return (
    <div>
      PortfolioView here
      {HoldingCards}
    </div>
  )
}

export default PortfolioView

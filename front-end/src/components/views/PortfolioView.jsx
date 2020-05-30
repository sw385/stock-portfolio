import React from "react"
import HoldingCard from "./HoldingCard"

// If you need cards or styling, you can uncomment the lines here to import
// import "./PortfolioView.css";

const PortfolioView = (props) => {
  console.log("kiwi", props.holdings)
  let holdingCards = []
  console.log("props.prices", props.prices)
  console.log("apple", props.holdings[1]["symbol"])
  console.log("pineapple", props.prices[props.holdings[1]["symbol"]])
  if (props.holdings) {
    for (let i = 0; i < props.holdings.length; i++) {
      let prices
      if (props.prices[props.holdings[i]["symbol"]]) {
        prices = props.prices[props.holdings[i]["symbol"]]
      }
      else {
        prices = ["---", "---", "---"]
      }
      holdingCards.push(<HoldingCard data={props.holdings[i]} price={prices}/>)
    }
  }
  return (
    <div>
      PortfolioView here
      {holdingCards}
    </div>
  )
}

export default PortfolioView

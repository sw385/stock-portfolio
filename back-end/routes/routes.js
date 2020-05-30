const express = require("express")
const router = express.Router()
const db = require("../db")

router.get("/:username/transactions", async function (req, res, next) {
  try {
    let balance = await db.query(
      "SELECT balance from users WHERE username=$1",
      [req.params.username]
    )
    balance = parseFloat(balance.rows[0]["balance"])
    let results = await db.query(
      "SELECT symbol, shares, price, is_buy, datetime FROM transactions WHERE username=$1 ORDER BY datetime DESC",
      [req.params.username]
    )
    for (let i = 0; i < results.rows.length; i++) {
      results.rows[i]["price"] = parseFloat(results.rows[i]["price"])
    }
    results = { balance: balance, transactions: results.rows }
    return res.json(results)
  } catch (err) {
    return next(err)
  }
})

router.get("/:username/portfolio", async function (req, res, next) {
  try {
    let balance = await db.query(
      "SELECT balance from users WHERE username=$1",
      [req.params.username]
    )
    balance = parseFloat(balance.rows[0]["balance"])
    let results = await db.query(
      "SELECT symbol, shares FROM portfolio WHERE username=$1 ORDER BY symbol",
      [req.params.username]
    )
    for (let i = 0; i < results.rows.length; i++) {
      results.rows[i]["price"] = parseFloat(results.rows[i]["price"])
    }
    results = { balance: balance, portfolio: results.rows }
    return res.json(results)
  } catch (err) {
    return next(err)
  }
})

router.post("/:username/buy", async function (req, res, next) {
  try {
    // if balance >= price * shares:
    // add middleware to check this BEFORE executing the changes
    // return the new transaction?
    let oldBalance = await db.query(
      "SELECT balance from users WHERE username=$1",
      [req.params.username]
    )
    oldBalance = parseFloat(oldBalance.rows[0]["balance"])
    let newBalance = oldBalance - req.body.shares * req.body.price
    await db.query("UPDATE users SET balance=$2 WHERE username=$1", [
      req.params.username,
      newBalance,
    ])
    const transaction = await db.query(
      "INSERT INTO transactions (username, is_buy, symbol, shares, price) VALUES ($1, True, $2, $3, $4) RETURNING symbol, shares, price, is_buy, datetime",
      [req.params.username, req.body.symbol, req.body.shares, req.body.price]
    )

    let oldShares = await db.query(
      "SELECT shares from portfolio WHERE (username=$1 AND symbol=$2)",
      [req.params.username, req.body.symbol]
    )
    if (oldShares.rows.length == 0) {
      await db.query(
        "INSERT INTO portfolio (username, symbol, shares) VALUES ($1, $2, $3)",
        [req.params.username, req.body.symbol, req.body.shares]
      )
    } else {
      oldShares = parseInt(oldShares.rows[0]["shares"])
      let newShares = oldShares + parseInt(req.body.shares)
      console.log(req.params.username, req.body.symbol, newShares)
      await db.query(
        "UPDATE portfolio SET shares=$3 WHERE (username=$1 AND symbol=$2)",
        [req.params.username, req.body.symbol, newShares]
      )
    }

    return res.json(transaction.rows[0])
  } catch (err) {
    return next(err)
  }
})

router.post("/:username/sell", async function (req, res, next) {
  try {
    // if shares <= owned shares:
    // and check that there are owned shares in the first place
    // add middleware to check this BEFORE executing the changes
    // return the new transaction?
    let oldBalance = await db.query(
      "SELECT balance from users WHERE username=$1",
      [req.params.username]
    )
    oldBalance = parseFloat(oldBalance.rows[0]["balance"])
    let newBalance = oldBalance + req.body.shares * req.body.price
    await db.query("UPDATE users SET balance=$2 WHERE username=$1", [
      req.params.username,
      newBalance,
    ])
    const transaction = await db.query(
      "INSERT INTO transactions (username, is_buy, symbol, shares, price) VALUES ($1, False, $2, $3, $4) RETURNING symbol, shares, price, is_buy, datetime",
      [req.params.username, req.body.symbol, req.body.shares, req.body.price]
    )

    let oldShares = await db.query(
      "SELECT shares from portfolio WHERE (username=$1 AND symbol=$2)",
      [req.params.username, req.body.symbol]
    )
    if (parseInt(oldShares.rows[0]["shares"]) == parseInt(req.body.shares)) {
      await db.query(
        "DELETE FROM portfolio WHERE (username=$1 AND symbol=$2)",
        [req.params.username, req.body.symbol]
      )
    } else {
      oldShares = parseInt(oldShares.rows[0]["shares"])
      let newShares = oldShares - parseInt(req.body.shares)
      // console.log(req.params.username, req.body.symbol, newShares)
      await db.query(
        "UPDATE portfolio SET shares=$3 WHERE (username=$1 AND symbol=$2)",
        [req.params.username, req.body.symbol, newShares]
      )
    }

    return res.json(transaction.rows[0])
  } catch (err) {
    return next(err)
  }
})

module.exports = router

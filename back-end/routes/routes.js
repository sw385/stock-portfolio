const express = require("express")
const router = express.Router()
const db = require("../db")
const bcrypt = require("bcrypt")
const jsonwebtoken = require("jsonwebtoken")

const SECRET = "Ranch Carnivore Subfloor"

router.post("/register", async (req, res, next) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const result = await db.query(
      "INSERT INTO users (username, user_email, pw_hash, balance, is_verified) VALUES ($1,$2,$3,5000,false) RETURNING username",
      [req.body.username, req.body.user_email, hashedPassword]
    )
    return res.json(result.rows[0])
  } catch (e) {
    return next(e)
  }
})

router.post("/login", async (req, res, next) => {
  try {
    // see if the user exists
    const foundUser = await db.query(
      "SELECT * FROM users WHERE user_email=$1 LIMIT 1",
      [req.body.user_email]
    )
    if (foundUser.rows.length === 0) {
      return res.json({ message: "Invalid user email" })
    }
    // if the user exists, compare the submitted password hash to the hash on file
    const hashedPassword = await bcrypt.compare(
      req.body.password,
      foundUser.rows[0].pw_hash
    )
    // if false, then the submitted password is not correct
    if (hashedPassword === false) {
      return res.json({ message: "Invalid password" })
    }

    // let's create a token using the sign() method
    const token = jsonwebtoken.sign(
      // the first parameter is an object which will become the payload of the token
      { username: foundUser.rows[0].username },
      // the second parameter is the secret key we are using to "sign" or encrypt the token
      SECRET,
      // the third parameter is an object where we can specify certain properties of the token
      {
        expiresIn: 60 * 60, // expire in one hour
      }
    )
    // send back an object with the key of token and the value of the token variable defined above
    return res.json({ token })
  } catch (e) {
    return res.json(e)
  }
})

// helpful middleware to make sure the user is logged in
function ensureLoggedIn(req, res, next) {
  try {
    const authHeaderValue = req.headers.authorization
    const token = jsonwebtoken.verify(authHeaderValue, SECRET)
    return next()
  } catch (e) {
    return res.status(401).json({ message: "Unauthorized" })
  }
}

// helpful middleware to make sure the username stored on the token is the same as the request
function ensureCorrectUser(req, res, next) {
  try {
    const authHeaderValue = req.headers.authorization
    const token = jsonwebtoken.verify(authHeaderValue, SECRET)
    if (token.username === req.params.username) {
      return next()
    } else {
      return res.status(401).json({ message: "Unauthorized" })
    }
  } catch (e) {
    return res.status(401).json({ message: "Unauthorized" })
  }
}

router.get("/:username/transactions", ensureCorrectUser, async function (
  req,
  res,
  next
) {
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

router.get("/:username/portfolio", ensureCorrectUser, async function (
  req,
  res,
  next
) {
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
    results = { balance: balance, portfolio: results.rows }
    return res.json(results)
  } catch (err) {
    return next(err)
  }
})

router.post("/:username/buy", ensureCorrectUser, async function (
  req,
  res,
  next
) {
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
    if (newBalance < 0) {
      return res.status(500).send({ message: "Insufficient balance" })
    }
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

    let balance = await db.query(
      "SELECT balance from users WHERE username=$1",
      [req.params.username]
    )
    transaction.rows[0]["price"] = parseFloat(transaction.rows[0]["price"])
    balance = parseFloat(balance.rows[0]["balance"])
    let result = { balance: balance, transaction: transaction.rows[0] }
    return res.json(result)
  } catch (err) {
    return next(err)
  }
})

router.post("/:username/sell", ensureCorrectUser, async function (
  req,
  res,
  next
) {
  try {
    // if shares <= owned shares:
    // and check that there are owned shares in the first place
    // add middleware to check this BEFORE executing the changes
    // return the new transaction?

    let oldShares = await db.query(
      "SELECT shares from portfolio WHERE (username=$1 AND symbol=$2)",
      [req.params.username, req.body.symbol]
    )
    if (parseInt(oldShares.rows[0]["shares"]) < parseInt(req.body.shares)) {
      return res.status(500).send({ message: "Insufficient number of shares" })
    }
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

    let balance = await db.query(
      "SELECT balance from users WHERE username=$1",
      [req.params.username]
    )
    transaction.rows[0]["price"] = parseFloat(transaction.rows[0]["price"])
    balance = parseFloat(balance.rows[0]["balance"])
    let result = { balance: balance, transaction: transaction.rows[0] }
    return res.json(result)
  } catch (err) {
    return next(err)
  }
})

module.exports = router

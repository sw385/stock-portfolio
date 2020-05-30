const express = require("express")
const router = express.Router()
const db = require("../db")

router.get("/:username/transactions", async function (req, res, next) {
  try {
    const results = await db.query(
      "SELECT symbol, shares, price, is_buy, datetime FROM transactions WHERE username=$1 ORDER BY datetime DESC",
      [req.params.username]
    )
    return res.json(results.rows)
  } catch (err) {
    return next(err)
  }
})

router.get("/:username/portfolio", async function (req, res, next) {
  try {
    const results = await db.query(
      "SELECT symbol, shares FROM portfolio WHERE username=$1 ORDER BY symbol",
      [req.params.username]
    )
    return res.json(results.rows)
  } catch (err) {
    return next(err)
  }
})

router.post("/:username/buy", async function (req, res, next) {
  try {
    // if balance > price * shares:
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

/*
router.get("/", async (req, res, next) => {
  // get all the messages and tags
  const message_and_tags = await db.query(
    `SELECT m.id, m.text, t.name 
     FROM messages m 
       JOIN messages_tags mt ON m.id=mt.message_id 
       JOIN tags t ON mt.tag_id = t.id 
     ORDER BY m.id`
  );

  // we're going to start a counter at 0
  let startIdx = 0;
  // here is the array we will return containing three message objects
  let messages = [];

  // let's loop over the data we got back from the query (an array of 5 objects similar to the table above)
  for (let i = 0; i < message_and_tags.rows.length; i++) {
    let currentMessage = message_and_tags.rows[i];
    // if our counter is NOT the same as the message id
    if (startIdx !== currentMessage.id) {
      // set the counter to be that message id
      startIdx = currentMessage.id;
      // create a property called tags which is an empty array
      currentMessage.tags = [];
      // add the name of the tag to the tags array
      currentMessage.tags.push(currentMessage.name);
      // get rid of the key of .name on our current message
      delete currentMessage.name;
      // add that current message to our array
      messages.push(currentMessage);
    } else {
      // if the counter is the same as the message id (same message, different tag)
      // add the name of that tag to the message at the correct index in our messages array
      messages[startIdx - 1].tags.push(currentMessage.name);
    }
  }
  return res.send(messages);
});

/*
router.post("/", async (req, res, next) => {
  try {
    const result = await db.query(
      "INSERT INTO messages (text) VALUES ($1) RETURNING *",
      [req.body.text]
    );
    res.json(result.rows[0]);
  } catch (err) {
    return next(err);
  }
});
*/

module.exports = router

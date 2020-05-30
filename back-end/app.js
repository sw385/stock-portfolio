const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./routes/routes");
const cors = require('cors');

app.use(cors());
app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use("/", routes);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  var err = new Error("Not Found");
  err.status = 404;
  return next(err);
});

// development error handler
// will print stacktrace
if (app.get("env") === "development") {
  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    return res.json({
      message: err.message,
      error: err
    });
  });
}

app.listen(3001, () => {
  console.log("Getting started on port 3001!");
});
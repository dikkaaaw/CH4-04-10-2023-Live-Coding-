const express = require("express");
const morgan = require("morgan"); //logger
const bodyParser = require("body-parser");

const ApiError = require("./utils/apiError");
const errorHandler = require("./controllers/errorController");

const router = require("./routes");

const PORT = process.env.PORT || 9000;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(`${__dirname}/public`));

app.set("views");

app.use(morgan("dev"));
app.use(router);

app.all("*", (req, res, next) => {
  const err = new Error("Route not exist!");
  err.status = "failed";
  err.statusCode = 404;

  next(new ApiError(`Route not exist!`, 404));
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running in port ${PORT}`);
});

const router = require("express").Router();

const product = require("./productRouter");
const Car = require("./carRouter");
const Auth = require("./authRouter");
const Shop = require("./shopRouter");
const User = require("./userRouter");

router.use("/api/v1/products", product);
router.use("/api/v1/cars", Car);
router.use("/api/v1/auth", Auth);
router.use("/api/v1/shop", Shop);
router.use("/api/v1/users", User);

module.exports = router;

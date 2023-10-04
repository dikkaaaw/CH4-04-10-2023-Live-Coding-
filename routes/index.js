const router = require("express").Router()

const product = require("./productRouter")

router.use("/api/v1/products", product)

module.exports = router;
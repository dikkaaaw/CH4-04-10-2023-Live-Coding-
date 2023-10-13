const router = require("express").Router();

const Shop = require("../controllers/shopController");
const Auth = require("../middlewares/authenticate");

router.post("/", Auth, Shop.createShop);
router.get("/", Shop.findAllShop);
router.get("/:id", Shop.findShopById);
router.patch("/:id", Shop.updateShop);
router.delete("/:id", Shop.deleteShop);

module.exports = router;

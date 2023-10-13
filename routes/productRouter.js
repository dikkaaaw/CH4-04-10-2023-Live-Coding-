const router = require("express").Router();

const product = require("../controllers/productController");

const uploader = require("../middlewares/uploader");
const autentikasi = require("../middlewares/authenticate");
const checkRole = require("../middlewares/checkRole");

router.post("/", uploader.single("image"), product.createProduct);
router.get("/", autentikasi, checkRole("Owner"), product.findAllProduct);
router.get("/:id", product.findProductById);
router.patch("/:id", product.updateProduct);
router.delete("/:id", product.deleteProduct);

module.exports = router;

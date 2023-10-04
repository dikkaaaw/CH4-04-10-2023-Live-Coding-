const router = require("express").Router()

const product = require("../controllers/productController")

router.post('/', product.createProduct)
router.get('/', product.findAllProduct)
router.get('/:id', product.findProductById)
router.patch('/:id', product.updateProduct)
router.delete('/:id', product.deleteProduct)

module.exports = router
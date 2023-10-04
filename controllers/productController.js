const {product} = require("../models/index")

const createProduct = async (req, res) => {
    const {name, price, stock} = req.body
    try {
        const newProduct = await product.create({
            name,
            price,
            stock
        })

        res.status(200).json({
            status: "success",
            data : {
                newProduct
            }
        })
    } catch (err) {
        res.status(404).json({
            status: 'failed',
            message: err.message
        })
    }
}

const findAllProduct = async (req, res) => {
    try {
        const Product = await product.findAll()

        res.status(200).json({
            status: "success",
            data : {
                Product
            }
        })
    } catch (err) {
        res.status(404).json({
            status: 'failed',
            message: err.message
        })
    }
}
const findProductById = async (req, res) => {
    try {
        const Product = await product.findOne({
            where: {
                id : req.params.id
            }
        })

        res.status(200).json({
            status: "success",
            message: "Data found!",
            data : {
                product
            }
        })
    } catch (err) {
        res.status(404).json({
            status: 'failed',
            message: err.message
        })
    }
}
const updateProduct = async (req, res) => {
    const { name, price, stock } = req.body;
    try {
        const product = await product.update({
            name,
            stock,
            price
        },
            {
                where: {
                    id: req.params.id,
                }
            },
        );
        res.status(200).json({
            status: "success",
            data: {
                product,
            },
        });
    } catch (err) {
        res.status(400).json({
            status: "failed",
            mesagge: err.mesagge
        });
    }
};

module.exports = {
    createProduct,
    findAllProduct,
    findProductById,
    updateProduct
}
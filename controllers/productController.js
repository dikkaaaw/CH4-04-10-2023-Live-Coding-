const imagekit = require("../lib/imagekit");
const { product } = require("../models/index");
const ApiError = require("../utils/apiError");

const createProduct = async (req, res, next) => {
  const { name, price, stock } = req.body;
  const file = req.file;
  let img;

  //get extension file
  try {
    if (file) {
      const split = file.originalname.split(".");
      const extension = split[split.length - 1];

      //up file ke imagekit
      const uploadedImage = await imagekit.upload({
        file: file.buffer,
        fileName: `IMG-${Date.now()}.${extension}`,
      });
      img = uploadedImage.url;
    }

    const newProduct = await product.create({
      name,
      price,
      stock,
      imgUrl: img,
    });

    res.status(200).json({
      status: "success",
      data: {
        newProduct,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const findAllProduct = async (req, res, next) => {
  try {
    const Product = await product.findAll();

    res.status(200).json({
      status: "success",
      data: {
        Product,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "failed",
      message: err.message,
    });
  }
};

const findProductById = async (req, res, next) => {
  try {
    const Product = await product.findOne({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      status: "success",
      message: "Data found!",
      data: {
        Product,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const updateProduct = async (req, res, next) => {
  const { name, price, stock } = req.body;
  try {
    const Product = await product.update(
      {
        name,
        stock,
        price,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({
      status: "success",
      message: "Success update data!",
      data: {
        Product,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      mesagge: err.mesagge,
    });
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const Product = await product.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!Product) {
      next(new ApiError("Data product tidak ditemukan!", 404));
    }

    await product.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({
      status: "success",
      message: "Berhasil hapus data produk!",
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

module.exports = {
  createProduct,
  findAllProduct,
  findProductById,
  updateProduct,
  deleteProduct,
};

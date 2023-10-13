const { Shop } = require("../models/index");
const ApiError = require("../utils/apiError");

const createShop = async (req, res, next) => {
  const { name } = req.body;
  const userId = req.user.id;
  try {
    const newShop = await Shop.create({
      name,
      userId,
    });

    res.status(200).json({
      status: "success",
      data: {
        newShop,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const findAllShop = async (req, res, next) => {
  try {
    const shop = await Shop.findAll();

    res.status(200).json({
      status: "success",
      data: {
        shop,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const findShopById = async (req, res) => {
  try {
    const shop = await Shop.findOne({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      status: "success",
      message: "Data found!",
      data: {
        shop,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const updateShop = async (req, res, next) => {
  const { name } = req.body;
  try {
    const updatedShop = await Shop.update(
      {
        name,
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
        updatedShop,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const deleteShop = async (req, res) => {
  try {
    const shop = await Shop.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!shop) {
      next(new ApiError("Data shop tidak ditemukan!", 404));
    }

    await Shop.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({
      status: "success",
      message: "Berhasil hapus data shop!",
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

module.exports = {
  createShop,
  findAllShop,
  findShopById,
  updateShop,
  deleteShop,
};

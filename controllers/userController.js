const { User } = require("../models/index");
const ApiError = require("../utils/apiError");

const createUser = async (req, res, next) => {
  const { name, age, role, address } = req.body;
  try {
    const newUser = await User.create({
      name,
      age,
      role,
      address,
    });

    res.status(200).json({
      status: "success",
      data: {
        newUser,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const findAllUsers = async (req, res, next) => {
  try {
    const user = await User.findAll();

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const findUserById = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      status: "success",
      message: "Data found!",
      data: {
        user,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const updateUser = async (req, res, next) => {
  const { name, age, role, address } = req.body;
  try {
    const updatedUser = await User.update(
      {
        name,
        age,
        role,
        address,
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
        updatedUser,
      },
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!user) {
      next(new ApiError("Data user tidak ditemukan!", 404));
    }

    await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({
      status: "success",
      message: "Berhasil hapus data user!",
    });
  } catch (err) {
    next(new ApiError(err.message, 400));
  }
};

module.exports = {
  createUser,
  findAllUsers,
  findUserById,
  updateUser,
  deleteUser,
};

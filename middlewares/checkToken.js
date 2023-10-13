const jwt = require("jsonwebtoken");
const { User } = require("../models/index");
const ApiError = require("../utils/apiError");

const checkToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      throw new Error("Token not found");
    }

    const decoded = jwt.verify(token, env.proccess.JWT_SECRET);

    const userData = await User.findOne({ where: { id: decoded.userId } });

    if (userData) {
      res.status(200).json({
        status: "Success",
        data: userData,
      });
    } else {
      throw new Error("User not found");
    }
  } catch (err) {
    next(new ApiError(err.message, 500));
  }
};

module.exports = checkToken;

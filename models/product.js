"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      product.belongsTo(models.Shop, {
        foreignKey: {
          name: "productId",
          allowNull: false,
        },
      });
    }
  }
  product.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.FLOAT,
      stock: DataTypes.INTEGER,
      imgUrl: {
        type: DataTypes.TEXT,
        defaultValue:
          "https://tse2.mm.bing.net/th?id=OIP.U2iQ7wNK6ZzTW_traW_-PQHaHa&pid=Api&P=0&h=180",
      },
    },
    {
      sequelize,
      modelName: "product",
    }
  );
  return product;
};

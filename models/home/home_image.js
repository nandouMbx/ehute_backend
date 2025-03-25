const { DataTypes } = require("sequelize")
const sequelize = require("../../utils/sequerize")

const site_home_images = sequelize.define(
   "site_home_images",
   {
      HOME_IMAGE_ID: {
         type: DataTypes.TINYINT(2),
         allowNull: false,
         primaryKey: true,
         autoIncrement: true,
      },
      HOME_PATH_IMAGE: {
         type: DataTypes.STRING,
         allowNull: false,
      },
   },
   {
      tableName: "site_home_images",
      timestamps: false,
   },
)
module.exports = site_home_images

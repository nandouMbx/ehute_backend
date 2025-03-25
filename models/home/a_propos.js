const { DataTypes } = require("sequelize")
const sequelize = require("../../utils/sequerize")

const site_about_photo = sequelize.define(
   "site_about_photo",
   {
      ABOUT_PHOTOS_ID: {
         type: DataTypes.TINYINT(3),
         allowNull: false,
         primaryKey: true,
         autoIncrement: true,
      },
      ABOUT_PHOTOS_PATH: {
         type: DataTypes.STRING(30),
         allowNull: false,
      },
      IS_PRINCIPAL: {
         type: DataTypes.TINYINT(1),
         allowNull: false,
      },
   },
   {
      tableName: "site_about_photo",
      timestamps: false,
   },
)
module.exports = site_about_photo

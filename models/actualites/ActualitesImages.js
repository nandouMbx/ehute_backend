const { DataTypes } = require("sequelize")
const sequelize = require("../../utils/sequerize")

const ActualitesImages = sequelize.define(
   "site_home_actualites_images",
   {
      ACTUALITES_IMAGE_ID: {
         type: DataTypes.TINYINT(2),
         allowNull: false,
         primaryKey: true,
         autoIncrement: true,
      },
      ACTUALITES_PATH_IMAGE: {
         type: DataTypes.STRING,
         allowNull: false,
      },
   },
   {
      tableName: "site_home_actualites_images",
      timestamps: false,
   },
)
module.exports = ActualitesImages

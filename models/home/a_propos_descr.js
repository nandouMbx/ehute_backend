const { DataTypes } = require("sequelize")
const sequelize = require("../../utils/sequerize")

const site_about_description = sequelize.define(
   "site_about_description",
   {
      ABOUT_DESC_ID: {
         type: DataTypes.TINYINT(3),
         allowNull: false,
         primaryKey: true,
         autoIncrement: true,
      },
      ABOUT_DESC_TITLE: {
         type: DataTypes.STRING(100),
         allowNull: false,
      },
      ABOUT_DESC_MISSION: {
         type: DataTypes.STRING(300),
         allowNull: false,
      },
      ABOUT_DESC_OBJECTIF: {
         type: DataTypes.STRING(300),
         allowNull: false,
      },
   },
   {
      tableName: "site_about_description",
      timestamps: false,
   },
)
module.exports = site_about_description

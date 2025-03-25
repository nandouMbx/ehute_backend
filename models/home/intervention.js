const { DataTypes } = require("sequelize")
const sequelize = require("../../utils/sequerize")

const intervention = sequelize.define(
   "site_interventions",
   {
      INTERVENTIONS_ID: {
         type: DataTypes.TINYINT(2),
         allowNull: false,
         autoIncrement: true,
         primaryKey: true,
      },
      INTERVENTIONS_TITLE: {
         type: DataTypes.STRING(60),
         allowNull: false,
      },
      INTERVENTIONS_DESC: {
         type: DataTypes.STRING(500),
         allowNull: false,
      },
      PATH_IMAGE: {
         type: DataTypes.STRING(80),
         allowNull: false,
      },
   },
   {
      tableName: "site_interventions",
      timestamps: false,
   },
)
module.exports = intervention

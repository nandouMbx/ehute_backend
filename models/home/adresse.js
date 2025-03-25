const { DataTypes } = require("sequelize")
const sequelize = require("../../utils/sequerize")

const site_adresse = sequelize.define(
   "site_adresse",
   {
      ADRESSE_ID: {
         type: DataTypes.TINYINT(3),
         allowNull: false,
         primaryKey: true,
         autoIncrement: true,
      },
      DESC_ADRESSE: {
         type: DataTypes.STRING(100),
         allowNull: false,
      },
   },
   {
      tableName: "site_adresse",
      timestamps: false,
   },
)
module.exports = site_adresse

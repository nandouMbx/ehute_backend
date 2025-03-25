const { DataTypes } = require("sequelize")
const sequelize = require("../../utils/sequerize")

const materiel = sequelize.define(
   "site_materiel",
   {
      MATERIEL_ID: {
         type: DataTypes.TINYINT(2),
         allowNull: false,
         autoIncrement: true,
         primaryKey: true,
      },
      MATERIEL_TITLE: {
         type: DataTypes.STRING(100),
         allowNull: false,
      },
      MATERIEL_DESC: {
         type: DataTypes.STRING(200),
         allowNull: false,
      },
   },
   {
      tableName: "site_materiel",
      timestamps: false,
   },
)
module.exports = materiel

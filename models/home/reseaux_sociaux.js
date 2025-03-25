const { DataTypes } = require("sequelize")
const sequelize = require("../../utils/sequerize")

const site_reseaux_sociaux = sequelize.define(
   "site_reseaux_sociaux",
   {
      RESEAUX_SOCIAUX_ID: {
         type: DataTypes.TINYINT(2),
         allowNull: false,
         primaryKey: true,
         autoIncrement: true,
      },
      LINK_RESEAUX_SOCIAUX: {
         type: DataTypes.STRING(70),
         allowNull: false,
      },
      LINK_ICON: {
         type: DataTypes.STRING(20),
         allowNull: false,
      },
   },
   {
      tableName: "site_reseaux_sociaux",
      timestamps: false,
   },
)
module.exports = site_reseaux_sociaux

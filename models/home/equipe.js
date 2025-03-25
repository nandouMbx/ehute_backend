const { DataTypes } = require("sequelize")
const sequelize = require("../../utils/sequerize")

const site_equipe = sequelize.define(
   "site_equipe",
   {
      EQUIPE_ID: {
         type: DataTypes.TINYINT(3),
         allowNull: false,
         primaryKey: true,
         autoIncrement: true,
      },
      EQUIPE_PATH_IMAGE: {
         type: DataTypes.STRING(100),
         allowNull: false,
      },
   },
   {
      tableName: "site_equipe",
      timestamps: false,
   },
)
module.exports = site_equipe

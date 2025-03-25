const { DataTypes } = require("sequelize")
const sequelize = require("../../utils/sequerize")

const medic = sequelize.define(
   "site_medicaments",
   {
      MEDICAMENTS_ID: {
         type: DataTypes.TINYINT(2),
         allowNull: false,
         autoIncrement: true,
         primaryKey: true,
      },
      DESC_MEDICAMENT: {
         type: DataTypes.STRING(500),
         allowNull: false,
      },
      PATH_IMAGE: {
         type: DataTypes.STRING(100),
         allowNull: false,
      },
   },
   {
      tableName: "site_medicaments",
      timestamps: false,
   },
)
module.exports = medic

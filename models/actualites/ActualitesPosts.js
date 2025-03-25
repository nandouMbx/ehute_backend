const { DataTypes } = require("sequelize")
const sequelize = require("../../utils/sequerize")

const ActualitesPosts = sequelize.define(
   "site_actualites_posts",
   {
      ACTUALITES_POST_ID: {
         type: DataTypes.TINYINT(3),
         allowNull: false,
         primaryKey: true,
         autoIncrement: true,
      },
      ACTUALITES_POST_TITLE: {
         type: DataTypes.STRING(200),
         allowNull: false,
      },
      ACTUALITES_POST_PERSON: {
         type: DataTypes.STRING(100),
         allowNull: false,
      },
      ACTUALITES_POST_DOMAIN: {
         type: DataTypes.STRING(20),
         allowNull: false,
      },
      ACTUALITES_POST_DESC: {
         type: DataTypes.STRING(500),
         allowNull: false,
      },
      ACTUALITES_POST_PATH: {
         type: DataTypes.STRING(70),
         allowNull: false,
      },
   },
   {
      tableName: "site_actualites_posts",
      timestamps: false,
   },
)
module.exports = ActualitesPosts

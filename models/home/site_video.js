const { DataTypes } = require("sequelize")
const sequelize = require("../../utils/sequerize")

const site_video = sequelize.define(
   "site_videos",
   {
      VIDEO_ID: {
         type: DataTypes.TINYINT(3),
         allowNull: false,
         autoIncrement: true,
         primaryKey: true,
      },
      VIDEO_TITLE: {
         type: DataTypes.STRING(100),
         allowNull: false,
      },
      VIDEO_PATH: {
         type: DataTypes.STRING(100),
         allowNull: false,
      },
   },
   {
      tableName: "site_videos",
      timestamps: false,
   },
)
module.exports = site_video

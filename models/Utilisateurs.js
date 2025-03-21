const { DataTypes } = require("sequelize")
const sequelize = require("../utils/sequerize")

const Utilisateurs = sequelize.define(
   "utilisateurs",
   {
      ID_UTILISATEUR: {
         type: DataTypes.INTEGER,
         allowNull: false,
         primaryKey: true,
         autoIncrement: true,
      },
      NOM: {
         type: DataTypes.STRING(250),
         allowNull: false,
      },
      PRENOM: {
         type: DataTypes.STRING(250),
         allowNull: true,
      },
      TELEPHONE: {
         type: DataTypes.STRING(250),
         allowNull: false,
      },
      EMAIL: {
         type: DataTypes.STRING(250),
         allowNull: false,
      },
      IMAGE: {
         type: DataTypes.STRING(255),
         allowNull: true,
         defaultValue: null,
      },
      ID_RIDER: {
         type: DataTypes.INTEGER,
         allowNull: true,
         defaultValue: null,
      },
      USERNAME: {
         type: DataTypes.STRING(250),
         allowNull: false,
      },
      PASSWORD: {
         type: DataTypes.STRING(250),
         allowNull: false,
      },
      ID_PROFIL: {
         type: DataTypes.INTEGER,
         allowNull: false,
      },
      ID_CORP_CORPORATE: {
         type: DataTypes.INTEGER,
         allowNull: true,
      },
      IS_ACTIF: {
         type: DataTypes.BOOLEAN,
         allowNull: false,
         defaultValue: 0,
      },
      HAS_CALL: {
         type: DataTypes.BOOLEAN,
         allowNull: false,
         defaultValue: 0,
      },
      DATE_INSERTION: {
         type: DataTypes.DATE,
         allowNull: true,
         defaultValue: DataTypes.NOW,
      },
   },
   {
      freezeTableName: true,
      tableName: "utilisateurs",
      timestamps: false,
   },
)

module.exports = Utilisateurs

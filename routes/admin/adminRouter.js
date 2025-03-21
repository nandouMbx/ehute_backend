const express = require("express")

const utilisateur_routes = require("./utilisateurs_admin.routes")
const requireAuth = require("../../middlewares/requireAuth")
const adminRouter = express.Router()

adminRouter.use("/utilisateurs", requireAuth, utilisateur_routes)

module.exports = adminRouter

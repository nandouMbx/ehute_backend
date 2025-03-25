const express = require("express")

const router = express.Router()
const actualitesPostesController = require("../../controllers/actualites/actualites_postes.controller")

router.post("/ajout_poste", actualitesPostesController.insertActualitesPosts)
router.put("/modifier_image/:ACTUALITES_POST_ID", actualitesPostesController.updateActualitesPosts)
router.get("/get_one/:ACTUALITES_POST_ID", actualitesPostesController.getActualitesPostsById)
router.get("/get_all", actualitesPostesController.getAllActualitesPosts)

module.exports = router

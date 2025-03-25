const express = require("express")

const router = express.Router()
const actualitesImagesController = require("../../controllers/actualites/actualites_images.controller")

router.post("/ajout_image", actualitesImagesController.insertActualitesImage)
router.put("/modifier_image/:ACTUALITES_IMAGE_ID", actualitesImagesController.updateActualitesImage)
router.get("/get_one/:ACTUALITES_IMAGE_ID", actualitesImagesController.getActualitesImageById)
router.get("/get_all", actualitesImagesController.getAllActualitesImages)

module.exports = router

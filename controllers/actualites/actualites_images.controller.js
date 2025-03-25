const Validation = require("../../class/Validation")
const ActualitesImages = require("../../models/actualites/ActualitesImages")
const Upload = require("../../class/Upload")
const RESPONSE_CODES = require("../../constants/RESPONSE_CODES")
const RESPONSE_STATUS = require("../../constants/RESPONSE_STATUS")
const IMAGES_DESTINATIONS = require("../../constants/IMAGES_DESTINATIONS")

// Insert a new ActualitesImage
async function insertActualitesImage(req, res) {
   try {
      const files = req.files || {} // Extract files from the request files

      const { ACTUALITES_IMAGE } = files

      const data = { ...req.body, ...req.files }

      const validation = new Validation(
         data,
         {
            ACTUALITES_IMAGE: { required: true, image: 2000000 },
         },
         {
            ACTUALITES_IMAGE: {
               image: "Image trop lourde, elle ne doit pas depassé 2 MO",
            },
         },
      )

      await validation.run()
      const isValid = await validation.isValidate()

      if (!isValid) {
         const errors = await validation.getErrors()
         return res.status(RESPONSE_CODES.UNPROCESSABLE_ENTITY).json({
            statusCode: RESPONSE_CODES.UNPROCESSABLE_ENTITY,
            httpStatus: RESPONSE_STATUS.UNPROCESSABLE_ENTITY,
            message: "Problème de validation de données",
            result: errors,
         })
      }

      const upload = new Upload()

      let uploadedFile
      const { fileInfo } = await upload.upload(ACTUALITES_IMAGE, false)
      uploadedFile = fileInfo

      const newImage = await ActualitesImages.create({
         ACTUALITES_PATH_IMAGE: `${IMAGES_DESTINATIONS.actualites}/${uploadedFile?.fileName}`,
      })
      res.status(RESPONSE_CODES.CREATED).json({
         statusCode: RESPONSE_CODES.CREATED,
         httpStatus: RESPONSE_STATUS.CREATED,
         message: "Image ajoutée avec succès",
         result: newImage,
      }) // Return the created image with a 201 status
   } catch (error) {
      console.log(error)
      res.status(RESPONSE_CODES.INTERNAL_SERVER_ERROR).json({
         statusCode: RESPONSE_CODES.INTERNAL_SERVER_ERROR,
         httpStatus: RESPONSE_STATUS.INTERNAL_SERVER_ERROR,
         message: error.message || "Erreur interne du serveur",
      })
   }
}

// Update an existing ActualitesImage by ID
async function updateActualitesImage(req, res) {
   try {
      const { ACTUALITES_IMAGE_ID } = req.params // Extract ID from request parameters

      const files = req.files || {} // Extract files from the request files

      const { ACTUALITES_IMAGE } = files

      const data = { ...req.body, ...req.files }

      const validation = new Validation(
         data,
         {
            ACTUALITES_IMAGE: { required: true, image: 2000000 },
         },
         {
            ACTUALITES_IMAGE: {
               image: "Image trop lourde, elle ne doit pas depassé 2 MO",
            },
         },
      )

      await validation.run()
      const isValid = await validation.isValidate()

      if (!isValid) {
         const errors = await validation.getErrors()
         return res.status(RESPONSE_CODES.UNPROCESSABLE_ENTITY).json({
            statusCode: RESPONSE_CODES.UNPROCESSABLE_ENTITY,
            httpStatus: RESPONSE_STATUS.UNPROCESSABLE_ENTITY,
            message: "Problème de validation de données",
            result: errors,
         })
      }

      const upload = new Upload()

      let uploadedFile
      const { fileInfo } = await upload.upload(ACTUALITES_IMAGE, false)
      uploadedFile = fileInfo

      const updatedImage = await ActualitesImages.update(
         {
            ACTUALITES_PATH_IMAGE: `${IMAGES_DESTINATIONS.actualites}/${uploadedFile?.fileName}`,
         },
         {
            where: { ACTUALITES_IMAGE_ID },
         },
      )
      res.status(RESPONSE_CODES.OK).json({
         statusCode: RESPONSE_CODES.OK,
         httpStatus: RESPONSE_STATUS.OK,
         message: "Image modifiée avec succès",
         result: updatedImage,
      })
   } catch (error) {
      console.log(error)
      res.status(RESPONSE_CODES.INTERNAL_SERVER_ERROR).json({
         statusCode: RESPONSE_CODES.INTERNAL_SERVER_ERROR,
         httpStatus: RESPONSE_STATUS.INTERNAL_SERVER_ERROR,
         message: error.message || "Erreur interne du serveur",
      })
   }
}

// Read all ActualitesImages
async function getAllActualitesImages(req, res) {
   try {
      const images = await ActualitesImages.findAll()
      return res.status(RESPONSE_CODES.OK).json({
         statusCode: RESPONSE_CODES.OK,
         httpStatus: RESPONSE_STATUS.OK,
         message: "liste des images d'actualités",
         result: {
            count: images.length,
            images,
         },
      }) // Return all images with a 200 status
   } catch (error) {
      console.log(error)
      res.status(RESPONSE_CODES.INTERNAL_SERVER_ERROR).json({
         statusCode: RESPONSE_CODES.INTERNAL_SERVER_ERROR,
         httpStatus: RESPONSE_STATUS.INTERNAL_SERVER_ERROR,
         message: error.message || "Erreur interne du serveur",
      })
   }
}

// Read one ActualitesImage by ID
async function getActualitesImageById(req, res) {
   try {
      const { ACTUALITES_IMAGE_ID } = req.params // Extract ID from request parameters
      const image = await ActualitesImages.findOne({ where: { ACTUALITES_IMAGE_ID } })
      if (!image) {
         res.status(RESPONSE_CODES.NOT_FOUND).json({
            statusCode: RESPONSE_CODES.NOT_FOUND,
            httpStatus: RESPONSE_STATUS.NOT_FOUND,
            message: "Image non trouvée",
         })
         return
      }
      return res.status(RESPONSE_CODES.OK).json({
         statusCode: RESPONSE_CODES.OK,
         httpStatus: RESPONSE_STATUS.OK,
         message: "Image trouvée",
         result: image,
      }) // Return the image with a 200 status
   } catch (error) {
      console.log(error)
      res.status(RESPONSE_CODES.INTERNAL_SERVER_ERROR).json({
         statusCode: RESPONSE_CODES.INTERNAL_SERVER_ERROR,
         httpStatus: RESPONSE_STATUS.INTERNAL_SERVER_ERROR,
         message: error.message || "Erreur interne du serveur",
      })
   }
}

module.exports = {
   insertActualitesImage,
   updateActualitesImage,
   getAllActualitesImages,
   getActualitesImageById,
}

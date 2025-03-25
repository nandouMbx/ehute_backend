const Validation = require("../../class/Validation")
const ActualitesPosts = require("../../models/actualites/ActualitesPosts")
const Upload = require("../../class/Upload")
const RESPONSE_CODES = require("../../constants/RESPONSE_CODES")
const RESPONSE_STATUS = require("../../constants/RESPONSE_STATUS")
const IMAGES_DESTINATIONS = require("../../constants/IMAGES_DESTINATIONS")

// Insert a new ActualitesPosts
async function insertActualitesPosts(req, res) {
   try {
      const files = req.files || {} // Extract files from the request files

      const { ACTUALITES_IMAGE } = files
      const { ACTUALITES_POST_TITLE, ACTUALITES_POST_PERSON, ACTUALITES_POST_DOMAIN, ACTUALITES_POST_DESC } = req.body

      const data = { ...req.body, ...req.files }

      const validation = new Validation(
         data,
         {
            ACTUALITES_POST_TITLE: { required: true },
            ACTUALITES_POST_PERSON: { required: true },
            ACTUALITES_POST_DOMAIN: { required: true },
            ACTUALITES_POST_DESC: { required: true },
            ACTUALITES_POST_IMAGE: { required: true, image: 2000000 },
         },
         {
            ACTUALITES_POST_IMAGE: {
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

      const newPost = await ActualitesPosts.create({
         ACTUALITES_POST_TITLE,
         ACTUALITES_POST_PERSON,
         ACTUALITES_POST_DOMAIN,
         ACTUALITES_POST_DESC,
         ACTUALITES_PATH_IMAGE: `${IMAGES_DESTINATIONS.actualites}/${uploadedFile?.fileName}`,
      })
      res.status(RESPONSE_CODES.CREATED).json({
         statusCode: RESPONSE_CODES.CREATED,
         httpStatus: RESPONSE_STATUS.CREATED,
         message: "Poste créé avec succès",
         result: newPost,
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

// Update an existing ActualitesPosts by ID
async function updateActualitesPosts(req, res) {
   try {
      const { ACTUALITES_POST_ID } = req.params // Extract ID from request parameters

      const files = req.files || {} // Extract files from the request files

      const { ACTUALITES_POST_IMAGE } = files
      const { ACTUALITES_POST_TITLE, ACTUALITES_POST_PERSON, ACTUALITES_POST_DOMAIN, ACTUALITES_POST_DESC } = req.body

      const data = { ...req.body, ...req.files }

      const validation = new Validation(
         data,
         {
            ACTUALITES_POST_TITLE: { required: true },
            ACTUALITES_POST_PERSON: { required: true },
            ACTUALITES_POST_DOMAIN: { required: true },
            ACTUALITES_POST_DESC: { required: true },
            ACTUALITES_POST_IMAGE: { required: true, image: 2000000 },
         },
         {
            ACTUALITES_POST_IMAGE: {
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
      const { fileInfo } = await upload.upload(ACTUALITES_POST_IMAGE, false)
      uploadedFile = fileInfo

      const updatedImage = await ActualitesPosts.update(
         {
            ACTUALITES_POST_TITLE,
            ACTUALITES_POST_PERSON,
            ACTUALITES_POST_DOMAIN,
            ACTUALITES_POST_DESC,
            ACTUALITES_POST_PATH: `${IMAGES_DESTINATIONS.actualites}/${uploadedFile?.fileName}`,
         },
         {
            where: { ACTUALITES_POST_ID },
         },
      )
      res.status(RESPONSE_CODES.OK).json({
         statusCode: RESPONSE_CODES.OK,
         httpStatus: RESPONSE_STATUS.OK,
         message: "Poste modifié avec succès",
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

// Read all ActualitesPosts
async function getAllActualitesPosts(req, res) {
   try {
      const posts = await ActualitesPosts.findAll()
      return res.status(RESPONSE_CODES.OK).json({
         statusCode: RESPONSE_CODES.OK,
         httpStatus: RESPONSE_STATUS.OK,
         message: "liste des postes d'actualités",
         result: {
            count: posts.length,
            posts,
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

// Read one ActualitesPosts by ID
async function getActualitesPostsById(req, res) {
   try {
      const { ACTUALITES_POST_ID } = req.params // Extract ID from request parameters
      const poste = await ActualitesPosts.findOne({ where: { ACTUALITES_POST_ID } })
      if (!poste) {
         res.status(RESPONSE_CODES.NOT_FOUND).json({
            statusCode: RESPONSE_CODES.NOT_FOUND,
            httpStatus: RESPONSE_STATUS.NOT_FOUND,
            message: "Poste non trouvé",
         })
         return
      }
      return res.status(RESPONSE_CODES.OK).json({
         statusCode: RESPONSE_CODES.OK,
         httpStatus: RESPONSE_STATUS.OK,
         message: "Poste trouvé",
         result: poste,
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
   insertActualitesPosts,
   updateActualitesPosts,
   getAllActualitesPosts,
   getActualitesPostsById,
}

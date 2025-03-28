const Validation = require("../../class/Validation")
const PostComments = require("../../models/actualites/PostComments")
const ActualitesPosts = require("../../models/actualites/ActualitesPosts")
const RESPONSE_CODES = require("../../constants/RESPONSE_CODES")
const RESPONSE_STATUS = require("../../constants/RESPONSE_STATUS")

// Insert a new Post comment
async function insertPostComment(req, res) {
   try {
      const { NOM_PRENOM, ACTUALITES_POST_ID, COMMENT, EMAIL, COMMENTATEUR_SITE_WEB } = req.body

      const data = { ...req.body }

      const validation = new Validation(
         data,
         {
            NOM_PRENOM: { required: true },
            ACTUALITES_POST_ID: { required: true },
            EMAIL: { required: true },
            COMMENT: { required: true },
         },
         {},
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

      const newComment = await PostComments.create({
         NOM_PRENOM,
         EMAIL,
         ACTUALITES_POST_ID,
         COMMENT,
         COMMENTATEUR_SITE_WEB,
      })

      return res.status(RESPONSE_CODES.CREATED).json({
         statusCode: RESPONSE_CODES.CREATED,
         httpStatus: RESPONSE_STATUS.CREATED,
         message: "Commentaire ajouté avec succès",
         result: newComment,
      })
   } catch (error) {
      return res.status(RESPONSE_CODES.SERVER_ERROR).json({
         statusCode: RESPONSE_CODES.SERVER_ERROR,
         httpStatus: RESPONSE_STATUS.SERVER_ERROR,
         message: "Erreur lors de l'ajout du commentaire",
         result: error.message,
      })
   }
}

// update an existing Post comment
async function updatePostComment(req, res) {
   try {
      const { COMMENT_ID } = req.params
      const { COMMENT } = req.body

      const data = { ...req.body }

      const validation = new Validation(
         data,
         {
            COMMENT: { required: true },
         },
         {},
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

      const updatedComment = await PostComments.update(
         {
            COMMENT,
         },
         {
            where: { COMMENT_ID },
         },
      )

      return res.status(RESPONSE_CODES.OK).json({
         statusCode: RESPONSE_CODES.OK,
         httpStatus: RESPONSE_STATUS.OK,
         message: "Commentaire modifié avec succès",
         result: updatedComment,
      })
   } catch (error) {
      return res.status(RESPONSE_CODES.SERVER_ERROR).json({
         statusCode: RESPONSE_CODES.SERVER_ERROR,
         httpStatus: RESPONSE_STATUS.SERVER_ERROR,
         message: "Erreur lors de la modification du commentaire",
         result: error.message,
      })
   }
}

// get all the comments
async function getAllComments(req, res) {
   try {
      const comments = await PostComments.findAll({
         include: [
            {
               model: ActualitesPosts,
               as: "site_actualites_posts",
            },
         ],
      })

      return res.status(RESPONSE_CODES.OK).json({
         statusCode: RESPONSE_CODES.OK,
         httpStatus: RESPONSE_STATUS.OK,
         message: "Liste des commentaires",
         result: comments,
      })
   } catch (error) {
      return res.status(RESPONSE_CODES.SERVER_ERROR).json({
         statusCode: RESPONSE_CODES.SERVER_ERROR,
         httpStatus: RESPONSE_STATUS.SERVER_ERROR,
         message: "Erreur lors de la récupération des commentaires",
         result: error.message,
      })
   }
}

//get comments by post id
async function getAllPostComments(req, res) {
   try {
      const { ACTUALITES_POST_ID } = req.params
      const comments = await PostComments.findAll({
         where: { ACTUALITES_POST_ID },
         include: [
            {
               model: ActualitesPosts,
               as: "site_actualites_posts",
            },
         ],
      })

      return res.status(RESPONSE_CODES.OK).json({
         statusCode: RESPONSE_CODES.OK,
         httpStatus: RESPONSE_STATUS.OK,
         message: "Liste des commentaires",
         result: comments,
      })
   } catch (error) {
      return res.status(RESPONSE_CODES.SERVER_ERROR).json({
         statusCode: RESPONSE_CODES.SERVER_ERROR,
         httpStatus: RESPONSE_STATUS.SERVER_ERROR,
         message: "Erreur lors de la récupération des commentaires",
         result: error.message,
      })
   }
}

module.exports = {
   insertPostComment,
   updatePostComment,
   getAllComments,
   getAllPostComments,
}

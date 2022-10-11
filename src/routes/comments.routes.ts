import Router from "express";

const router = Router();

import {getAllCommentsByUser, createComment, deleteComment} from '../controllers/comments.controller'

router.get("/comment/:person_commented", getAllCommentsByUser);
/*router.get("/estate/:id", getEstateByUser);
router.get("/estateOfOnePublication/:idRealEstate", getEstateOfOnePublication); */
router.post("/comment", createComment);
router.delete("/comment/:id", deleteComment);
/* router.post("/addPhotoToRealEstate/:id_real_estate", addNewPhotoToRealEstate);
router.put("/estate/:id", updateEstate);
 */

module.exports = router;

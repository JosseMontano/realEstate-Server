import Router from "express";

const router = Router();

import {getAllCommentsByUser, createComment, deleteComment} from '../controllers/comments.controller'

router.get("/comment/:person_commented", getAllCommentsByUser);
router.post("/comment", createComment);
router.delete("/comment/:id", deleteComment);


module.exports = router;

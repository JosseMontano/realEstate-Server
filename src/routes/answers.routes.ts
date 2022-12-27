import Router from "express";

const router = Router();

import {
  deleteAnswer,
} from "../controllers/answers.controller";

/* router.get("/answer/:idRealEstate", getAnswerQuestionByRealEstate); */
router.delete("/answer/:id", deleteAnswer);

module.exports = router;

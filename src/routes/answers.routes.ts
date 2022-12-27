import Router from "express";

const router = Router();

import {
  createAnswer,
  deleteAnswer,
  getAnswerQuestionByRealEstate,
} from "../controllers/answers.controller";

router.get("/answer/:idRealEstate", getAnswerQuestionByRealEstate);
router.post("/answer", createAnswer);
router.delete("/answer/:id", deleteAnswer);

module.exports = router;

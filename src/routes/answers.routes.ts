import Router from "express";

const router = Router();

import {
  createAnswer,
  getAllAnswer,
  deleteAnswer,
  getAnswerQuestionByRealEstate,
} from "../controllers/answers.controller";

router.get("/answer", getAllAnswer);
router.get("/answer/:idRealEstate", getAnswerQuestionByRealEstate);
router.post("/answer", createAnswer);
router.delete("/answer/:id", deleteAnswer);

module.exports = router;

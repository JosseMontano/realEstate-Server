import Router from "express";

const router = Router();

import {
  createQuestion,
  deleteQuestion,
  getAllquestionsByIdRealEstate,
} from "../controllers/questions.controller";

router.get("/question/:idRealEstate", getAllquestionsByIdRealEstate);
router.post("/question", createQuestion);
router.delete("/question/:id", deleteQuestion);

module.exports = router;

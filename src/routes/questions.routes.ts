import Router from "express";

const router = Router();

import {createQuestion, deleteQuestion, getAllquestions} from '../controllers/questions.controller'

router.get("/question", getAllquestions);
router.post("/question", createQuestion);
router.delete("/question/:id", deleteQuestion);


module.exports = router;

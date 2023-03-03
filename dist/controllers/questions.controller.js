"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteQuestion = exports.createQuestion = exports.getAllquestionsByIdRealEstate = void 0;
const zod_1 = require("zod");
const pool = require("../db");
const QuestionSchema = zod_1.z.object({
    question: zod_1.z.string().nonempty(),
});
const getAllquestionsByIdRealEstate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idRealEstate } = req.params;
        const allQuestionResponse = yield pool.query(`select aq.id, aq.id_question as idQuestion 
      from answers_questions aq, answers a where aq.id_answer=a.id 
      and a.id_real_estate=$1
        `, [idRealEstate]);
        let idsQuestions = " ";
        const rowsResponse = allQuestionResponse.rows;
        if (allQuestionResponse.rowCount > 0) { // if there is ids so ...
            for (let i = 0; i < rowsResponse.length; i++) {
                if (i == 0) {
                    idsQuestions = "id !=" + rowsResponse[i].idquestion + idsQuestions;
                }
                else {
                    idsQuestions =
                        "id != " + rowsResponse[i].idquestion + " and " + idsQuestions;
                }
            }
            const allQuestions = yield pool.query(`select * from questions where ${idsQuestions}` // show the rows that the id does't exits
            );
            res.json(allQuestions.rows);
        }
        const allQuestions = yield pool.query(`select * from questions`);
        res.json(allQuestions.rows);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllquestionsByIdRealEstate = getAllquestionsByIdRealEstate;
const createQuestion = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { question } = req.body;
    try {
        QuestionSchema.parse(req.body);
        yield pool.query("insert into questions (question) values ($1) returning *", [question]);
        res.json({ action: true });
    }
    catch (error) {
        next(error);
    }
});
exports.createQuestion = createQuestion;
const deleteQuestion = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const question = yield pool.query("delete from questions where id=$1", [
            id,
        ]);
        if (question.rowCount === 0)
            return res.status(404).json({
                message: "Not found",
            });
        return res.json({ action: true });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteQuestion = deleteQuestion;

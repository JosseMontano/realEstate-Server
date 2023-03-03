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
exports.deleteAnswer = exports.create = exports.get = void 0;
const zod_1 = require("zod");
const pool = require("../db");
const QuestionSchema = zod_1.z.object({
    answer: zod_1.z.string().min(2),
});
const get = (idRealEstate) => __awaiter(void 0, void 0, void 0, function* () {
    const allEstate = yield pool.query(`select aq.id, aq.id_answer, aq.id_question , q.question, ans.answer,
      ans.id_real_estate
      from answers_questions aq, questions q, answers ans
      where aq.id_question=q.id and aq.id_answer = ans.id and ans.id_real_estate=$1
        `, [idRealEstate]);
    return allEstate.rows;
});
exports.get = get;
const create = (form) => __awaiter(void 0, void 0, void 0, function* () {
    const { answer, id_real_estate, id_question } = form;
    QuestionSchema.parse(form);
    const createAnswer = yield pool.query("insert into answers (answer, id_real_estate) values ($1, $2) returning *", [answer, id_real_estate]);
    const id_answer = createAnswer.rows[0].id;
    const answerQuestion = yield pool.query("insert into answers_questions (id_answer, id_question) values ($1, $2) returning *", [id_answer, id_question]);
    return answerQuestion.rows[0].id;
});
exports.create = create;
const deleteAnswer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const question = yield pool.query("delete from answers where id=$1", [id]);
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
exports.deleteAnswer = deleteAnswer;

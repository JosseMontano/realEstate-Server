import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import Answer from "../interfaces/answer";
const pool = require("../db");

const QuestionSchema = z.object({
  answer: z.string().min(2),
});

export const get = async (idRealEstate: number) => {
  const allEstate = await pool.query(
    ` select aq.id, aq.id_answer, aq.id_question , q.question, ans.answer,
      ans.id_real_estate
      from answers_questions aq, questions q, answers ans
      where aq.id_question=q.id and aq.id_answer = ans.id and ans.id_real_estate=$1
        `,
    [idRealEstate]
  );
  console.log(allEstate.rows);
  return allEstate.rows;
};

export const create = async (form: Answer) => {
  const { answer, id_real_estate, id_question } = form;

  QuestionSchema.parse(form);
  const createAnswer = await pool.query(
    "insert into answers (answer, id_real_estate) values ($1, $2) returning *",
    [answer, id_real_estate]
  );

  const id_answer = createAnswer.rows[0].id;

  const answerQuestion = await pool.query(
    "insert into answers_questions (id_answer, id_question) values ($1, $2) returning *",
    [id_answer, id_question]
  );
  return answerQuestion.rows[0].id;
};

export const deleteAnswer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const question = await pool.query("delete from answers where id=$1", [id]);
    if (question.rowCount === 0)
      return res.status(404).json({
        message: "Not found",
      });
    return res.json({ action: true });
  } catch (error: any) {
    next(error);
  }
};

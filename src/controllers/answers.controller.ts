import { NextFunction, Request, Response } from "express";
import { z } from "zod";
const pool = require("../db");

const QuestionSchema = z.object({
  answer: z.string().nonempty(),
});


export const getAnswerQuestionByRealEstate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idRealEstate } = req.params;
    const allEstate = await pool.query(
      ` select aq.id, aq.id_answer, aq.id_question , q.question, ans.answer,
      ans.id_real_estate
      from answers_questions aq, questions q, answers ans
      where aq.id_question=q.id and aq.id_answer = ans.id and ans.id_real_estate=$1
        `,
      [idRealEstate]
    );
    res.json(allEstate.rows);
  } catch (error: any) {
    next(error);
  }
};

export const createAnswer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { answer, id_real_estate, id_question } = req.body;
  try {
    QuestionSchema.parse(req.body);
    const answers = await pool.query(
      "insert into answers (answer, id_real_estate) values ($1, $2) returning *",
      [answer, id_real_estate]
    );
    const id_answer = answers.rows[0].id;

    await pool.query(
      "insert into answers_questions (id_answer, id_question) values ($1, $2) returning *",
      [id_answer, id_question]
    );
    res.json({ action: true });
  } catch (error: any) {
    next(error);
  }
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

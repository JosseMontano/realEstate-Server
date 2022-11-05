import { NextFunction, Request, Response } from "express";
import { number, z } from "zod";
const pool = require("../db");

const QuestionSchema = z.object({
  question: z.string().nonempty(),
});

export const getAllquestions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allEstate = await pool.query(
      ` select id, question from questions
        `
    );
    res.json(allEstate.rows);
  } catch (error: any) {
    next(error);
  }
};

export const getAllquestionsByIdRealEstate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idRealEstate } = req.params;
    const allQuestionResponse = await pool.query(
      ` select aq.id, aq.id_question as idQuestion 
      from answers_questions aq, answers a where aq.id_answer=a.id 
      and a.id_real_estate=$1
        `,
      [idRealEstate]
    );
    let idsQuestions = " ";
    const rowsResponse = allQuestionResponse.rows;

    if (allQuestionResponse.rowCount > 0) { // if there is ids so ...
      for (let i = 0; i < rowsResponse.length; i++) {
        if (i == 0) {
          idsQuestions = "id !=" + rowsResponse[i].idquestion + idsQuestions;
        } else {
          idsQuestions =
            "id != " + rowsResponse[i].idquestion + " and " + idsQuestions;
        }
      }
      const allQuestions = await pool.query(
        `select * from questions where ${idsQuestions}` // show the rows that the id does't exits
      );
      res.json(allQuestions.rows);
    }
    const allQuestions = await pool.query(`select * from questions`);
    res.json(allQuestions.rows);
  } catch (error: any) {
    next(error);
  }
};

export const createQuestion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { question } = req.body;
  try {
    QuestionSchema.parse(req.body);
    await pool.query(
      "insert into questions (question) values ($1) returning *",
      [question]
    );
    res.json({ action: true });
  } catch (error: any) {
    next(error);
  }
};

export const deleteQuestion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const question = await pool.query("delete from questions where id=$1", [
      id,
    ]);
    if (question.rowCount === 0)
      return res.status(404).json({
        message: "Not found",
      });
    return res.json({ action: true });
  } catch (error: any) {
    next(error);
  }
};

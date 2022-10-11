import { NextFunction, Request, Response } from "express";

const pool = require("../db");

export const getAllCommentsByUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {person_commented} = req.params;
    const allComments = await pool.query(
      `
      select * from comments where person_commented = $1
      `,[person_commented]
    );
   /*  // get data of User that is commentator
    const idCommentator = allComments.rows[0].commentator
    const Commentator = await pool.query(
        `
        select * from users where id= $1
        `,[idCommentator]
      );
    console.log(Commentator.rows[0])
 */

    res.json(allComments.rows);
  } catch (error: any) {
    next(error);
  }
};

export const createComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { commentator, description, person_commented } = req.body;
  try {
    //save data of the realEstate
    const result = await pool.query(
      "insert into comments (description, commentator, person_commented) values ($1, $2, $3) returning *",
      [description, commentator, person_commented]
    );
    res.status(200).json(result.rows[0]);
  } catch (error: any) {
    next(error);
  }
};
export const deleteComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //delete data real Estates
    const {id} = req.params;
    const resRealEstate = await pool.query(
      "delete from comments where id=$1",
      [id]
    );
    if (resRealEstate.rowCount === 0)
      return res.status(404).json({
        message: "Not found",
      });
    return res.json({ action: true });
  } catch (error: any) {
    next(error);
  }
};
import { NextFunction, Request, Response } from "express";
import { number } from "zod";

const pool = require("../db");

export const getAllCommentsByUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { person_commented } = req.params;
    const allComments = await pool.query(
      `select u.email, c.id as id_comment, c.commentator, c.description,c.amount_start, p.url
      from comments c, users u, photos p
      where c.commentator = u.id and c.person_commented = $1 and u.id_photo=p.id
      `,
      [person_commented]
    );
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
  const { commentator, description, person_commented, amount_start } = req.body;
  try {
    //save data of the realEstate
    const result = await pool.query(
      "insert into comments (description, commentator, person_commented, amount_start) values ($1, $2, $3, $4) returning *",
      [description, commentator, person_commented, amount_start]
    );

    const amountStarBD = await pool.query(
      `
        select * from users where id= $1
        `,
      [person_commented]
    );

    let amountStartBDUnique = amountStarBD.rows[0].qualification;

    amountStartBDUnique =
      parseFloat(amountStartBDUnique) + parseFloat(amount_start);

    const updateAmountStartUser = await pool.query(
      "update users set qualification=$1 where id=$2 returning *",
      [amountStartBDUnique, person_commented]
    );
    if (updateAmountStartUser.rows.length === 0)
      return res.status(404).json({
        message: "Not found",
      });

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
    const { id } = req.params;
    const resRealEstate = await pool.query("delete from comments where id=$1", [
      id,
    ]);
    if (resRealEstate.rowCount === 0)
      return res.status(404).json({
        message: "Not found",
      });
    return res.json({ action: true });
  } catch (error: any) {
    next(error);
  }
};

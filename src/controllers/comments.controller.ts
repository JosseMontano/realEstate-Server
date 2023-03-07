import { z } from "zod";
import Comments from "../interfaces/comments";
const pool = require("../db");

const QuestionSchema = z.object({
  description: z.string().min(2),
  commentator: z.number().nonnegative(),
  person_commented: z.number().nonnegative(),
  amount_start: z.number().nonnegative(),
});

export const getAllCommentsByUserSer = async (person_commented: number) => {
  const allComments = await pool.query(
    `select u.email, c.id as id_comment, c.commentator, c.description,c.amount_start, u.url_photo
    from comments c, users u
    where c.commentator = u.id and c.person_commented = $1
      `,
    [person_commented]
  );
  return allComments.rows;
};

export const createComment = async (comments: Comments) => {
  //save data of the realEstate
  QuestionSchema.parse(comments);
  const { amount_start, commentator, person_commented, description } = comments;
  const result = await pool.query(
    "insert into comments (description, commentator, person_commented, amount_start) values ($1, $2, $3, $4) returning *",
    [description, commentator, person_commented, amount_start]
  );

  const amountStarBD = await pool.query(`select * from users where id= $1`, [
    person_commented,
  ]);

  let amountStartBDUnique = amountStarBD.rows[0].qualification;

  amountStartBDUnique = parseFloat(amountStartBDUnique) + amount_start;

  await pool.query(
    "update users set qualification=$1 where id=$2 returning *",
    [amountStartBDUnique, person_commented]
  );
  return result.rows[0].id;
};

export const deleteComment = async (id: number) => {
  //delete data real Estates
  const resRealEstate = await pool.query("delete from comments where id=$1", [
    id,
  ]);
  if (resRealEstate.rowCount === 0) return false;

  return true;
};

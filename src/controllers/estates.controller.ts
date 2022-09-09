import { NextFunction, Request, Response } from "express";


const pool = require("../db");

const getAllEstates = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allEstate = await pool.query("select * from estate");
    res.json(allEstate.rows);
  } catch (error: any) {
    next(error);
  }
};

const getEstate = async (req: Request, res: Response, next: NextFunction) => {
  //validar que el id sea entero
  try {
    const { id } = req.params;
    const result = await pool.query("select * from estate where id = $1", [id]);
    if (result.rows.length === 0)
      return res.status(404).json({
        message: "Not found",
      });
    res.json(result.rows[0]);
    //res.json(result.rows);
  } catch (error: any) {
    next(error);
  }
};

const createEstate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, description } = req.body;
  try {
    const result = await pool.query(
      "insert into estate (title, description) values ($1, $2) returning *",
      [title, description]
    );
    res.json(result.rows[0]);
  } catch (error: any) {
    next(error);
    //es better send a 500
  }
};
const deleteEstate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const result = await pool.query("delete from estate where id = $1", [id]);
    if (result.rowCount === 0)
      return res.status(404).json({
        message: "Not found",
      });
    return res.sendStatus(204);
  } catch (error: any) {
    next(error);
  }
};

const updateEstate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const result = await pool.query(
      "update estate set title=$1, description=$2 where id=$3 returning *",
      [title, description, id]
    );
    if (result.rows.length === 0)
      return res.status(404).json({
        message: "Not found",
      });
    /*  console.log(result) */
    return res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getAllEstates,
  getEstate,
  createEstate,
  deleteEstate,
  updateEstate,
};

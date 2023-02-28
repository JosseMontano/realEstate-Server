import { NextFunction, Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { uploadImage, deleteImage } from "../libs/cloudinary";
import fs from "fs-extra";
const pool = require("../db");


const getPhoto = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `
    select * from photos where id = ${id}
      `
    );

    if (result.rows.length === 0)
      return res.status(404).json({
        message: "Imagen not found",
      });
    res.json(result.rows);
  } catch (error: any) {
    next(error);
  }
};

const createPhoto = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let f = req.files?.url as UploadedFile;
    if (f) {
      const resu = await uploadImage(f.tempFilePath);
      const result = await pool.query(
        "insert into photos (url, public_id) values ($1, $2) returning *",
        [resu.secure_url, resu.public_id]
      );
      await fs.remove(f.tempFilePath);
      res.json(result.rows[0]);
    }
  } catch (error: any) {
    next(error);
  }
};

const deletePhoto = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const getId = await pool.query("select * from photos where id = $1", [id]);
    const result = await pool.query("delete from photos where id = $1", [id]);
    if (result.rowCount === 0)
      return res.status(404).json({
        message: "Not found",
      });
    //fs.remove(result.public_id)
    await deleteImage(getId.rows[0].public_id);
    return res.sendStatus(204);
  } catch (error: any) {
    next(error);
  }
};

module.exports = {
  getPhoto,
  createPhoto,
  deletePhoto,
};

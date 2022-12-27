import { NextFunction, Request, Response } from "express";
import { uploadImage, deleteImage } from "../libs/cloudinary";
import { UploadedFile } from "express-fileupload";
import fs from "fs-extra";
import { transporter } from "../libs/mailer";
const { emailer } = require("../config");
const pool = require("../db");

export const updatePhotoUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.params;
    let f1 = req.files?.url as UploadedFile;
    if (!f1) {
      return res.status(400).json({
        message: "photo no send",
      });
    }
    //get the row of user
    const rowUser = await pool.query("select * from users where email = $1", [
      email,
    ]);
    const idPhoto = rowUser.rows[0].id_photo;
    const idUser = rowUser.rows[0].id;
    if (idPhoto != null) {
      //delete img from cloudinary
      const getId = await pool.query("select * from photos where id = $1", [
        idPhoto,
      ]);
      await deleteImage(getId.rows[0].public_id);

      // save the new photo
      if (f1) {
        const resUpload = await uploadImage(f1.tempFilePath);
        const resPhoto = await pool.query(
          "insert into photos (url, public_id) values ($1, $2) returning *",
          [resUpload.secure_url, resUpload.public_id]
        );
        await fs.remove(f1.tempFilePath);
        const idPhoto = resPhoto.rows[0].id;
        //save in table user the id photo
        const resTableRelational = await pool.query(
          "update users set id_photo = $1 where id=$2 returning *",
          [idPhoto, idUser]
        );

        if (resTableRelational.rows.length === 0) {
          return res.status(400).json({
            message: "Not found",
          });
        }
      }

      //delete data photos old
      const deletePhotoOfTable = await pool.query(
        "delete from photos where id = $1",
        [idPhoto]
      );
      if (deletePhotoOfTable.rowCount === 0)
        return res.status(400).json({
          message: "Data Not found",
        });

      return res.status(200).json({
        operation: true,
      });
    }

    //the user haven't photo so... save the photo
    let f = req.files?.url as UploadedFile;
    if (f) {
      const resUpload = await uploadImage(f.tempFilePath);
      const resPhoto = await pool.query(
        "insert into photos (url, public_id) values ($1, $2) returning *",
        [resUpload.secure_url, resUpload.public_id]
      );
      await fs.remove(f.tempFilePath);
      const idPhoto = resPhoto.rows[0].id;
      //save in table user the id photo
      const resTableRelational = await pool.query(
        "update users set id_photo = $1 where id=$2 returning *",
        [idPhoto, idUser]
      );

      if (resTableRelational.rows.length === 0) {
        return res.status(400).json({
          message: "Not found",
        });
      }

      return res.status(200).json(resTableRelational.rows[0]);
    }
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `
      select u.email, u.id as id_usuario, p.url, p.public_id, p.id as id_photo from users u, photos 
      p where u.id_photo=p.id and u.id = $1
        `,
      [id]
    );
    if (result.rows.length === 0)
      return res.status(400).json({
        message: "Data not found",
      });
    res.status(200).json(result.rows);
    //res.json(result.rows);
  } catch (error: any) {
    next(error);
  }
};

export const sendEmailToRecuperateAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email } = req.params;
  try {
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: `"Forgot password 👻" ${emailer.user}`, // sender address
      to: email, // list of receivers
      subject: "Fogot Password", // Subject line
      html: `
      <p>Utiliza el siguiente codigo para cambiar la contraseña, la proxima trata de no olvidarla</p>
      <center><h2>22356</h2></center>
      `, // html body
    });
    if (info.messageId) {
      return res.status(200).json({
        operation: true,
      });
    }
    return res.status(500);
  } catch (error) {
    next(error);
  }
};

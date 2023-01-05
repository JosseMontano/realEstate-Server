import { NextFunction, Request, Response } from "express";
import { uploadImage, deleteImage } from "../libs/cloudinary";
import { UploadedFile } from "express-fileupload";
import fs from "fs-extra";
import RealEstateType from "../interfaces/realEstate";
const pool = require("../db");

const queryRealEstate = `
  select DISTINCT on (re.id) re.id as idRealEstate, rp.id as idRealEstatePhoto,p.id as idPhoto,  p.url, 
  p.public_id, re.title, re.description, u.email, u.id as idUser
  from real_estates_photos rp , photos p, real_estates re, users u 
  where rp.id_photo = p.id and rp.id_real_estate = re.id and re.id_user = u.id and re.available=1
  ORDER BY re.id`;

export const getAllEstates = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allEstate = await pool.query(`${queryRealEstate}`);
    res.json(allEstate.rows);
  } catch (error: any) {
    next(error);
  }
};

export const getRealEstatesMostRecent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allEstate = await pool.query(`${queryRealEstate} desc limit 8`);
    if (allEstate.rows.length === 0) {
      return res.status(404).json({
        message: "Data not found",
      });
    }

    res.json(allEstate.rows);
  } catch (error: any) {
    next(error);
  }
};
/**
 * TODO:Refactor this function
 */
export const getRealEstatesByUSerRecommended = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allEstate = await pool.query(
      `
      SELECT * 
      FROM(SELECT DISTINCT on (u.email) re.id as idRealEstate, rp.id as idRealEstatePhoto,
          p.id as idPhoto,  p.url, 
           p.public_id, re.title, re.description, u.email, u.id as idUser, u.qualification
           from real_estates_photos rp , photos p, real_estates re, users u  
           where rp.id_photo = p.id and rp.id_real_estate = re.id and re.id_user = u.id and re.available=1
           ORDER BY u.email DESC) users ORDER BY users.qualification desc;
      `
    );
    if (allEstate.rows.length === 0) {
      return res.status(404).json({
        message: "Data not found",
      });
    }
    res.json(allEstate.rows);
  } catch (error: any) {
    next(error);
  }
};

export const getEstateByUser = async (
  idUser: number
): Promise<RealEstateType[]> => {
  const result = await pool.query(
    `
    select DISTINCT on (re.id) re.id as idRealEstate, rp.id as idRealEstatePhoto,p.id as idPhoto,  p.url, 
    p.public_id, re.title, re.description, u.email, re.available, u.cellphonenumber
    from real_estates_photos rp , photos p, real_estates re, users u 
    where rp.id_photo = p.id and rp.id_real_estate = re.id and re.id_user = u.id and re.id_user=${idUser}
    ORDER BY re.id
      `
  );

  if (result.rows.length === 0) return [];

  return result.rows;
};

export const getEstateOfOnePublication = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { idRealEstate } = req.params;
    const result = await pool.query(
      `
      select re.id as idRealEstate, rp.id as idRealEstatePhoto,p.id as idPhoto,  p.url, 
      p.public_id, re.title, re.description, u.email
      from real_estates_photos rp , photos p, real_estates re, users u 
      where rp.id_photo = p.id and rp.id_real_estate = re.id and re.id_user = u.id
      and re.id = ${idRealEstate}
      `
    );

    if (result.rows.length === 0)
      return res.status(404).json({
        message: "Not found",
      });
    res.json(result.rows);
    //res.json(result.rows);
  } catch (error: any) {
    next(error);
  }
};

export const createEstate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, description, id_user, id_type } = req.body;

  try {
    //save data of the realEstate
    const result = await pool.query(
      "insert into real_estates (title, description, id_user, id_type_real_estate, available) values ($1, $2, $3, $4, $5) returning *",
      [title, description, id_user, id_type, 1]
    );
    const id_real_estate = result.rows[0].id;

    //save first photo
    let f = req.files?.url as UploadedFile;
    if (f) {
      const resUpload = await uploadImage(f.tempFilePath);
      const resPhoto = await pool.query(
        "insert into photos (url, public_id) values ($1, $2) returning *",
        [resUpload.secure_url, resUpload.public_id]
      );
      await fs.remove(f.tempFilePath);
      const idPhoto = resPhoto.rows[0].id;

      //save in table relational
      const resTableRelational = await pool.query(
        "insert into real_estates_photos (id_photo, id_real_estate) values ($1, $2) returning *",
        [idPhoto, id_real_estate]
      );
      res.json(resTableRelational.rows[0]);
    }

    res.json(result.rows[0]);
  } catch (error: any) {
    next(error);
    //es better send a 500
  }
};

export const addNewPhotoToRealEstate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id_real_estate } = req.params;
    //save first photo
    let f = req.files?.url as UploadedFile;
    if (f) {
      const resUpload = await uploadImage(f.tempFilePath);
      const resPhoto = await pool.query(
        "insert into photos (url, public_id) values ($1, $2) returning *",
        [resUpload.secure_url, resUpload.public_id]
      );
      await fs.remove(f.tempFilePath);
      const idPhoto = resPhoto.rows[0].id;

      //save in table relational
      const resTableRelational = await pool.query(
        "insert into real_estates_photos (id_photo, id_real_estate) values ($1, $2) returning *",
        [idPhoto, id_real_estate]
      );
      return res.json({ action: true });
    }
    return res.json({ action: false });
  } catch (error: any) {
    next(error);
  }
};

export const deleteEstate = async (
  idRealEstatePhoto: number,
  idPhoto: number,
  idRealEstate: number
) => {
  //delete img from cloudinary
  const getId = await pool.query("select * from photos where id = $1", [
    idPhoto,
  ]);
  await deleteImage(getId.rows[0].public_id);

  //delete data relational
  await pool.query("delete from real_estates_photos where id = $1", [
    idRealEstatePhoto,
  ]);

  //delete data photos
  await pool.query("delete from photos where id = $1", [idPhoto]);

  //delete data real Estates
  const resRealEstate = await pool.query(
    "delete from real_estates where id=$1",
    [idRealEstate]
  );
  if (resRealEstate.rowCount === 0) return false;
  return true;
};

export const updateEstate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { title, description, id_user } = req.body;
    const result = await pool.query(
      "update real_estates set title=$1, description=$2, id_user=$3 where id=$3 returning *",
      [title, description, id_user, id]
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

export const updateStateAvailable = async (
  idRealEstate: number,
  available: boolean
) => {
  const result = await pool.query(
    "update real_estates set available=$1 where id=$2 returning *",
    [available, idRealEstate]
  );
  if (result.rows.length === 0) return false;
  return true;
};

export const getTypeRealEstat = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const allComments = await pool.query(
      `select * from type_real_estates
      `
    );
    res.json(allComments.rows);
  } catch (error: any) {
    next(error);
  }
};

export const getAllEstatesByType = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { type } = req.params;
    const allEstate = await pool.query(
      `
      select DISTINCT on (re.id) re.id as idRealEstate, rp.id as idRealEstatePhoto,p.id as idPhoto,  p.url, 
      p.public_id, re.title, re.description, u.email, u.id as idUser
      from real_estates_photos rp , photos p, real_estates re, users u, type_real_estates tre
      where rp.id_photo = p.id and rp.id_real_estate = re.id and re.id_user = u.id and re.available=1 and
      re.id_type_real_estate = tre.id and tre.name_type =$1
      ORDER BY re.id`,
      [type]
    );
    res.json(allEstate.rows);
  } catch (error: any) {
    next(error);
  }
};

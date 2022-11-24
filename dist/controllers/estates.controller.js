"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRealEstatesOthers = exports.getRealEstatesByGarzonier = exports.getRealEstatesByStudioApartament = exports.getRealEstatesBydepartament = exports.getRealEstatesByHouse = exports.getAllEstatesByType = exports.getTypeRealEstat = exports.updateStateAvailable = exports.updateEstate = exports.deleteEstate = exports.addNewPhotoToRealEstate = exports.createEstate = exports.getEstateOfOnePublication = exports.getEstateByEmail = exports.getEstateByUser = exports.getRealEstatesByUSerRecommended = exports.getRealEstatesMostRecent = exports.getAllEstates = void 0;
const cloudinary_1 = require("../libs/cloudinary");
const fs_extra_1 = __importDefault(require("fs-extra"));
const pool = require("../db");
const getAllEstates = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allEstate = yield pool.query(`
      select DISTINCT on (re.id) re.id as idRealEstate, rp.id as idRealEstatePhoto,p.id as idPhoto,  p.url, 
      p.public_id, re.title, re.description, u.email, u.id as idUser
      from real_estates_photos rp , photos p, real_estates re, users u 
      where rp.id_photo = p.id and rp.id_real_estate = re.id and re.id_user = u.id and re.available=1
      ORDER BY re.id
      `);
        res.json(allEstate.rows);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllEstates = getAllEstates;
const getRealEstatesMostRecent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allEstate = yield pool.query(`
      select DISTINCT on (re.id) re.id as idRealEstate, rp.id as idRealEstatePhoto,p.id as idPhoto,  p.url, 
      p.public_id, re.title, re.description, u.email, u.id as idUser
      from real_estates_photos rp , photos p, real_estates re, users u 
      where rp.id_photo = p.id and rp.id_real_estate = re.id and re.id_user = u.id and re.available=1
      ORDER BY re.id desc
      `);
        res.json(allEstate.rows);
    }
    catch (error) {
        next(error);
    }
});
exports.getRealEstatesMostRecent = getRealEstatesMostRecent;
const getRealEstatesByUSerRecommended = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allEstate = yield pool.query(`
      SELECT * 
      FROM(SELECT DISTINCT on (u.email) re.id as idRealEstate, rp.id as idRealEstatePhoto,
          p.id as idPhoto,  p.url, 
           p.public_id, re.title, re.description, u.email, u.id as idUser, u.qualification
           from real_estates_photos rp , photos p, real_estates re, users u  
           where rp.id_photo = p.id and rp.id_real_estate = re.id and re.id_user = u.id and re.available=1
           ORDER BY u.email DESC) users ORDER BY users.qualification desc;
      `);
        res.json(allEstate.rows);
    }
    catch (error) {
        next(error);
    }
});
exports.getRealEstatesByUSerRecommended = getRealEstatesByUSerRecommended;
const getEstateByUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield pool.query(`
    select DISTINCT on (re.id) re.id as idRealEstate, rp.id as idRealEstatePhoto,p.id as idPhoto,  p.url, 
    p.public_id, re.title, re.description, u.email, CASE WHEN re.available = 1 THEN 'Disponible'
    WHEN re.available = 0 THEN 'No esta disponible' END AS state
    from real_estates_photos rp , photos p, real_estates re, users u 
    where rp.id_photo = p.id and rp.id_real_estate = re.id and re.id_user = u.id and re.id_user=${id}
    ORDER BY re.id
      `);
        if (result.rows.length === 0)
            return res.status(404).json({
                message: "The User has no Publications",
            });
        res.json(result.rows);
        //res.json(result.rows);
    }
    catch (error) {
        next(error);
    }
});
exports.getEstateByUser = getEstateByUser;
const getEstateByEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idUser } = req.params;
        const result = yield pool.query(`
    select DISTINCT on (re.id) re.id as idRealEstate, rp.id as idRealEstatePhoto,p.id as idPhoto,  p.url, 
    p.public_id, re.title, re.description, u.email, u.cellphonenumber
    from real_estates_photos rp , photos p, real_estates re, users u 
    where rp.id_photo = p.id and rp.id_real_estate = re.id and re.id_user = u.id and u.id=$1
    ORDER BY re.id
      `, [idUser]);
        if (result.rows.length === 0)
            return res.status(404).json({
                message: "Not found",
            });
        res.json(result.rows);
        //res.json(result.rows);
    }
    catch (error) {
        next(error);
    }
});
exports.getEstateByEmail = getEstateByEmail;
const getEstateOfOnePublication = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idRealEstate } = req.params;
        const result = yield pool.query(`
      select re.id as idRealEstate, rp.id as idRealEstatePhoto,p.id as idPhoto,  p.url, 
      p.public_id, re.title, re.description, u.email
      from real_estates_photos rp , photos p, real_estates re, users u 
      where rp.id_photo = p.id and rp.id_real_estate = re.id and re.id_user = u.id
      and re.id = ${idRealEstate}
      `);
        if (result.rows.length === 0)
            return res.status(404).json({
                message: "Not found",
            });
        res.json(result.rows);
        //res.json(result.rows);
    }
    catch (error) {
        next(error);
    }
});
exports.getEstateOfOnePublication = getEstateOfOnePublication;
const createEstate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { title, description, id_user, id_type } = req.body;
    const id_typeNumber = parseInt(id_type);
    try {
        //save data of the realEstate
        const result = yield pool.query("insert into real_estates (title, description, id_user, id_type_real_estate, available) values ($1, $2, $3, $4, $5) returning *", [title, description, id_user, id_typeNumber, 1]);
        const id_real_estate = result.rows[0].id;
        //save first photo
        let f = (_a = req.files) === null || _a === void 0 ? void 0 : _a.url;
        if (f) {
            const resUpload = yield (0, cloudinary_1.uploadImage)(f.tempFilePath);
            const resPhoto = yield pool.query("insert into photos (url, public_id) values ($1, $2) returning *", [resUpload.secure_url, resUpload.public_id]);
            yield fs_extra_1.default.remove(f.tempFilePath);
            const idPhoto = resPhoto.rows[0].id;
            //save in table relational
            const resTableRelational = yield pool.query("insert into real_estates_photos (id_photo, id_real_estate) values ($1, $2) returning *", [idPhoto, id_real_estate]);
            res.json(resTableRelational.rows[0]);
        }
        res.json(result.rows[0]);
    }
    catch (error) {
        next(error);
        //es better send a 500
    }
});
exports.createEstate = createEstate;
const addNewPhotoToRealEstate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const { id_real_estate } = req.params;
        //save first photo
        let f = (_b = req.files) === null || _b === void 0 ? void 0 : _b.url;
        if (f) {
            const resUpload = yield (0, cloudinary_1.uploadImage)(f.tempFilePath);
            const resPhoto = yield pool.query("insert into photos (url, public_id) values ($1, $2) returning *", [resUpload.secure_url, resUpload.public_id]);
            yield fs_extra_1.default.remove(f.tempFilePath);
            const idPhoto = resPhoto.rows[0].id;
            //save in table relational
            const resTableRelational = yield pool.query("insert into real_estates_photos (id_photo, id_real_estate) values ($1, $2) returning *", [idPhoto, id_real_estate]);
            return res.json({ action: true });
        }
        return res.json({ action: false });
    }
    catch (error) {
        next(error);
    }
});
exports.addNewPhotoToRealEstate = addNewPhotoToRealEstate;
const deleteEstate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { idRealEstatePhoto } = req.params;
        const { idPhoto } = req.params;
        const { idRealEstate } = req.params;
        //delete img from cloudinary
        const getId = yield pool.query("select * from photos where id = $1", [
            idPhoto,
        ]);
        yield (0, cloudinary_1.deleteImage)(getId.rows[0].public_id);
        //delete data relational
        const resultRealEstates = yield pool.query("delete from real_estates_photos where id = $1", [idRealEstatePhoto]);
        //delete data photos
        const resPhoto = yield pool.query("delete from photos where id = $1", [
            idPhoto,
        ]);
        //delete data real Estates
        const resRealEstate = yield pool.query("delete from real_estates where id=$1", [idRealEstate]);
        if (resRealEstate.rowCount === 0)
            return res.status(404).json({
                message: "Not found",
            });
        return res.json({ action: true });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteEstate = deleteEstate;
const updateEstate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title, description, id_user } = req.body;
        const result = yield pool.query("update real_estates set title=$1, description=$2, id_user=$3 where id=$3 returning *", [title, description, id_user, id]);
        if (result.rows.length === 0)
            return res.status(404).json({
                message: "Not found",
            });
        /*  console.log(result) */
        return res.json(result.rows[0]);
    }
    catch (error) {
        next(error);
    }
});
exports.updateEstate = updateEstate;
const updateStateAvailable = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { available } = req.body;
        const result = yield pool.query("update real_estates set available=$1 where id=$2 returning *", [available, id]);
        if (result.rows.length === 0)
            return res.status(404).json({
                message: "Not found",
            });
        return res.json(result.rows[0]);
    }
    catch (error) {
        next(error);
    }
});
exports.updateStateAvailable = updateStateAvailable;
const getTypeRealEstat = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allComments = yield pool.query(`select * from type_real_estates
      `);
        res.json(allComments.rows);
    }
    catch (error) {
        next(error);
    }
});
exports.getTypeRealEstat = getTypeRealEstat;
const getAllEstatesByType = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { type } = req.params;
        const allEstate = yield pool.query(`
      select DISTINCT on (re.id) re.id as idRealEstate, rp.id as idRealEstatePhoto,p.id as idPhoto,  p.url, 
      p.public_id, re.title, re.description, u.email, u.id as idUser
      from real_estates_photos rp , photos p, real_estates re, users u, type_real_estates tre
      where rp.id_photo = p.id and rp.id_real_estate = re.id and re.id_user = u.id and re.available=1 and
      re.id_type_real_estate = tre.id and tre.name_type =$1
      ORDER BY re.id`, [type]);
        res.json(allEstate.rows);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllEstatesByType = getAllEstatesByType;
const getRealEstatesByHouse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allEstate = yield pool.query(`
      select DISTINCT on (re.id) re.id as idRealEstate, rp.id as idRealEstatePhoto,p.id as idPhoto,  p.url, 
      p.public_id, re.title, re.description, u.email, u.id as idUser
      from real_estates_photos rp , photos p, real_estates re, users u 
      where rp.id_photo = p.id and rp.id_real_estate = re.id and re.id_user = u.id
      and re.available=1 and re.id_type_real_estate = 1 
      ORDER BY re.id desc
      `);
        res.json(allEstate.rows);
    }
    catch (error) {
        next(error);
    }
});
exports.getRealEstatesByHouse = getRealEstatesByHouse;
const getRealEstatesBydepartament = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allEstate = yield pool.query(`
      select DISTINCT on (re.id) re.id as idRealEstate, rp.id as idRealEstatePhoto,p.id as idPhoto,  p.url, 
      p.public_id, re.title, re.description, u.email, u.id as idUser
      from real_estates_photos rp , photos p, real_estates re, users u 
      where rp.id_photo = p.id and rp.id_real_estate = re.id and re.id_user = u.id
      and re.available=1 and re.id_type_real_estate = 2 
      ORDER BY re.id desc
      `);
        res.json(allEstate.rows);
    }
    catch (error) {
        next(error);
    }
});
exports.getRealEstatesBydepartament = getRealEstatesBydepartament;
const getRealEstatesByStudioApartament = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allEstate = yield pool.query(`
      select DISTINCT on (re.id) re.id as idRealEstate, rp.id as idRealEstatePhoto,p.id as idPhoto,  p.url, 
      p.public_id, re.title, re.description, u.email, u.id as idUser
      from real_estates_photos rp , photos p, real_estates re, users u 
      where rp.id_photo = p.id and rp.id_real_estate = re.id and re.id_user = u.id
      and re.available=1 and re.id_type_real_estate = 3 
      ORDER BY re.id desc
      `);
        res.json(allEstate.rows);
    }
    catch (error) {
        next(error);
    }
});
exports.getRealEstatesByStudioApartament = getRealEstatesByStudioApartament;
const getRealEstatesByGarzonier = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allEstate = yield pool.query(`
      select DISTINCT on (re.id) re.id as idRealEstate, rp.id as idRealEstatePhoto,p.id as idPhoto,  p.url, 
      p.public_id, re.title, re.description, u.email, u.id as idUser
      from real_estates_photos rp , photos p, real_estates re, users u 
      where rp.id_photo = p.id and rp.id_real_estate = re.id and re.id_user = u.id
      and re.available=1 and re.id_type_real_estate = 4 
      ORDER BY re.id desc
      `);
        res.json(allEstate.rows);
    }
    catch (error) {
        next(error);
    }
});
exports.getRealEstatesByGarzonier = getRealEstatesByGarzonier;
const getRealEstatesOthers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allEstate = yield pool.query(`
      select DISTINCT on (re.id) re.id as idRealEstate, rp.id as idRealEstatePhoto,p.id as idPhoto,  p.url, 
      p.public_id, re.title, re.description, u.email, u.id as idUser
      from real_estates_photos rp , photos p, real_estates re, users u 
      where rp.id_photo = p.id and rp.id_real_estate = re.id and re.id_user = u.id
      and re.available=1 and re.id_type_real_estate != 4 and re.id_type_real_estate != 3
      and re.id_type_real_estate != 2 and re.id_type_real_estate != 1 
      ORDER BY re.id desc
      `);
        res.json(allEstate.rows);
    }
    catch (error) {
        next(error);
    }
});
exports.getRealEstatesOthers = getRealEstatesOthers;

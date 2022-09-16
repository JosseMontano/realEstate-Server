import { Router } from "express";

const router = Router();
const { createPhoto,getAllPhotos, deletePhoto } = require("../controllers/photos.controller");

router.get("/photo", getAllPhotos);
router.post("/photo", createPhoto);
router.delete("/photo/:id", deletePhoto);
/* router.get("/estate", getAllEstates);
router.get("/estate/:id", getEstate);
router.put("/estate/:id", updateEstate);
 */

module.exports = router;

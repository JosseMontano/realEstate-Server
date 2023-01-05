import { Router } from "express";

const router = Router();
const {
  createPhoto,
  getPhoto,
  deletePhoto,
} = require("../controllers/photos.controller");

/* router.get("/photo", getAllPhotos); */
router.get("/photo/:id", getPhoto);
router.post("/photo", createPhoto);
router.delete("/photo/:id", deletePhoto);

module.exports = router;

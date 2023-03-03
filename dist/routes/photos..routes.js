"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const { createPhoto, getPhoto, deletePhoto, } = require("../controllers/photos.controller");
/* router.get("/photo", getAllPhotos); */
router.get("/photo/:id", getPhoto);
router.post("/photo", createPhoto);
router.delete("/photo/:id", deletePhoto);
module.exports = router;

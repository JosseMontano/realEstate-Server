import { Router } from "express";

const router = Router();
const {
  getAllEstates,
  getEstateByUser,
  getEstateOfOnePublication,
  createEstate,
  deleteEstate,
  updateEstate,
  addNewPhotoToRealEstate
} = require("../controllers/estates.controller");

router.get("/estate", getAllEstates);
router.get("/estate/:id", getEstateByUser);
router.get("/estateOfOnePublication/:idRealEstate", getEstateOfOnePublication);
router.post("/estate", createEstate);
router.post("/addPhotoToRealEstate/:id_real_estate", addNewPhotoToRealEstate);
router.put("/estate/:id", updateEstate);
router.delete("/estate/:idRealEstatePhoto/:idPhoto/:idRealEstate", deleteEstate);

module.exports = router;

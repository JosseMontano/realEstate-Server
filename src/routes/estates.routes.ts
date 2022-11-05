import { Router } from "express";

const router = Router();
import {
  addNewPhotoToRealEstate,
  createEstate,
  deleteEstate,
  getAllEstates,
  getEstateByEmail,
  getEstateByUser,
  getEstateOfOnePublication,
  getRealEstatesMostRecent,
  updateEstate,
  getRealEstatesByUSerRecommended,
  updateStateAvailable,
} from "../controllers/estates.controller";

router.get("/estate", getAllEstates);
router.get("/estateMostRecent", getRealEstatesMostRecent);
router.get("/estateRecommendedByUser", getRealEstatesByUSerRecommended);
router.get("/estate/:id", getEstateByUser);
router.get("/estate/visit/:idUser", getEstateByEmail);
router.get("/estateOfOnePublication/:idRealEstate", getEstateOfOnePublication);
router.post("/estate", createEstate);
router.post("/addPhotoToRealEstate/:id_real_estate", addNewPhotoToRealEstate);
router.put("/estate/:id", updateEstate);
router.delete(
  "/estate/:idRealEstatePhoto/:idPhoto/:idRealEstate",
  deleteEstate
);
router.put("/availableEstate/:id", updateStateAvailable);

module.exports = router;

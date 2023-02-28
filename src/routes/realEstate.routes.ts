import { Router } from "express";

const router = Router();
import {
  addNewPhotoToRealEstate,
  createEstate,
  getAllEstates,
  getEstateOfOnePublication,
  getRealEstatesMostRecent,
  updateEstate,
  getRealEstatesByUSerRecommended,
  getTypeRealEstat,
  getAllEstatesByType,
  getAllEstatesByFilterCustom,
} from "../controllers/realEstate.controller";

router.get("/estate", getAllEstates);
router.get("/type_real_estate", getTypeRealEstat);
router.get("/estateMostRecent", getRealEstatesMostRecent);
router.get("/estateRecommendedByUser", getRealEstatesByUSerRecommended);
router.get("/estateOfOnePublication/:idRealEstate", getEstateOfOnePublication);
router.put("/estate/:id", updateEstate);
router.get("/estateByType/:type", getAllEstatesByType);





router.post("/estateByFilterCustom", getAllEstatesByFilterCustom);
router.post("/estate", createEstate);
router.post("/addPhotoToRealEstate/:id_real_estate", addNewPhotoToRealEstate);
module.exports = router;

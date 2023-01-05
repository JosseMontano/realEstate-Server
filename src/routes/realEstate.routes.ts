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
} from "../controllers/realEstate.controller";

router.get("/estate", getAllEstates);
router.get("/type_real_estate", getTypeRealEstat);
router.get("/estateMostRecent", getRealEstatesMostRecent);
router.get("/estateByType/:type", getAllEstatesByType);
router.get("/estateRecommendedByUser", getRealEstatesByUSerRecommended);
/* router.get("/estate/:id", getEstateByUser); */
router.get("/estateOfOnePublication/:idRealEstate", getEstateOfOnePublication);
router.post("/estate", createEstate);
router.post("/addPhotoToRealEstate/:id_real_estate", addNewPhotoToRealEstate);
router.put("/estate/:id", updateEstate);


module.exports = router;

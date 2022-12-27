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
  getTypeRealEstat,
  getRealEstatesByHouse,
  getRealEstatesBydepartament,
  getRealEstatesByStudioApartament,
  getRealEstatesByGarzonier,
  getRealEstatesOthers,
  getAllEstatesByType,
  
} from "../controllers/estates.controller";

router.get("/estate", getAllEstates);
router.get("/type_real_estate", getTypeRealEstat);
router.get("/estateMostRecent", getRealEstatesMostRecent);
router.get("/estateByHouse", getRealEstatesByHouse);
router.get("/estateByDepartament", getRealEstatesBydepartament);
router.get("/estateByStudioApartament", getRealEstatesByStudioApartament);
router.get("/estateByGarzonier", getRealEstatesByGarzonier);
router.get("/estateOthers", getRealEstatesOthers);
router.get("/estateByType/:type", getAllEstatesByType);

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

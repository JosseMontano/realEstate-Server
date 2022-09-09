const { Router } = require("express");

const router = Router();
const {
  getAllEstates,
  getEstate,
  createEstate,
  deleteEstate,
  updateEstate,
} = require("../controllers/estates.controller");

router.get("/estate", getAllEstates);

router.get("/estate/:id", getEstate);
router.post("/estate", createEstate);
router.put("/estate/:id", updateEstate);
router.delete("/estate/:id", deleteEstate);

module.exports = router;

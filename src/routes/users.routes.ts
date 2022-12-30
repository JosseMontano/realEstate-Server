import { Router } from "express";

const router = Router();
import {
  updatePhotoUser,
  getUserById,
  sendEmailCode,
  changePassword
} from "../controllers/users.controller";

router.put("/editPhotoUser/:email", updatePhotoUser);
router.post("/recuperateAccount/:email", sendEmailCode);
router.post("/changePassword/", changePassword);
router.get("/getUserComplete/:id", getUserById);

module.exports = router;

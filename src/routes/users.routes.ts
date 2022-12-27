import { Router } from "express";

const router = Router();
import {
  updatePhotoUser,
  getUser,
  getUserById,
  sendEmailToRecuperateAccount,
} from "../controllers/users.controller";

router.put("/editPhotoUser/:email", updatePhotoUser);
router.put("/recuperateAccount/:email", sendEmailToRecuperateAccount);
router.get("/getUserPhotoProfile/:email", getUser);
router.get("/getUserComplete/:id", getUserById);

module.exports = router;

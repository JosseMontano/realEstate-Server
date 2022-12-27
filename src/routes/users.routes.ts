import { Router } from "express";

const router = Router();
import {
  updatePhotoUser,
  getUserById,
  sendEmailToRecuperateAccount,
} from "../controllers/users.controller";

router.put("/editPhotoUser/:email", updatePhotoUser);
router.put("/recuperateAccount/:email", sendEmailToRecuperateAccount);
router.get("/getUserComplete/:id", getUserById);

module.exports = router;

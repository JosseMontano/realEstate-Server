import { Router } from "express";

const router = Router();
import { updatePhotoUser, getUser, getUserById } from "../controllers/users.controller";

router.put("/editPhotoUser/:email", updatePhotoUser);
router.get("/getUserPhotoProfile/:email", getUser);
router.get("/getUserComplete/:id", getUserById);

module.exports = router;

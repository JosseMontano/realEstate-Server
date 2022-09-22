import { Router } from "express";

const router = Router();
import { updatePhotoUser, getUser } from "../controllers/users.controller";

router.put("/editPhotoUser/:email", updatePhotoUser);
router.get("/getUserPhotoProfile/:email", getUser);

module.exports = router;

import { Router } from "express";
const router = Router();

import {
  logOut,
  me,
  signIn,
  signUp,
  verifyValidateToken,
} from "../controllers/sessions.controller";

const verifyToken = require("../controllers/verifyToken");

router.post("/signup", signUp);
router.get("/me", verifyToken, me);
router.post("/signin", signIn);
router.get("/verifyToken", verifyValidateToken);
router.get("/logout", logOut);

module.exports = router;

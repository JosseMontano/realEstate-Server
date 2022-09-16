import { Router } from "express";
const router = Router();
const {
  signUp,
  me,
  signIn,
  verifyValidateToken,
  logOut,
} = require("../controllers/sessions.controllers");
const verifyToken = require("../controllers/verifyToken");

router.post("/signup", signUp);
router.get("/me", verifyToken, me);
router.post("/signin", signIn);
router.get("/verifyToken", verifyValidateToken);
router.get("/logout", logOut);

module.exports = router;

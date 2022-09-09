import { Router } from "express";
const router = Router();
const { signUp,me, signIn, verifyValidateToken }  = require("../controllers/sessions.controllers");
const verifyToken = require('../controllers/verifyToken')
router.post("/signup", signUp);

router.get("/me", verifyToken, me);

router.post("/signin", signIn);

router.get("/verifyToken", verifyValidateToken);
module.exports = router;

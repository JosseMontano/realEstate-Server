"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const users_controller_1 = require("../controllers/users.controller");
router.put("/editPhotoUser/:email", users_controller_1.updatePhotoUser);
router.post("/recuperateAccount/:email", users_controller_1.sendEmailCode);
router.post("/changePassword/", users_controller_1.changePassword);
router.get("/getUserComplete/:id", users_controller_1.getUserById);
module.exports = router;

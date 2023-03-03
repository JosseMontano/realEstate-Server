"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = (0, express_1.default)();
const questions_controller_1 = require("../controllers/questions.controller");
router.get("/question/:idRealEstate", questions_controller_1.getAllquestionsByIdRealEstate);
router.post("/question", questions_controller_1.createQuestion);
router.delete("/question/:id", questions_controller_1.deleteQuestion);
module.exports = router;

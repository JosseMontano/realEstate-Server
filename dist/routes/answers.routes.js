"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = (0, express_1.default)();
const answers_controller_1 = require("../controllers/answers.controller");
/* router.get("/answer/:idRealEstate", getAnswerQuestionByRealEstate); */
router.delete("/answer/:id", answers_controller_1.deleteAnswer);
module.exports = router;

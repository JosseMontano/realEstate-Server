"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAnswerQuestionByRealEstate = void 0;
const graphql_1 = require("graphql");
const answers_controller_1 = require("../../controllers/answers.controller");
const answer_1 = require("../typeDef/answer");
exports.getAnswerQuestionByRealEstate = {
    type: new graphql_1.GraphQLList(answer_1.answerType),
    args: {
        id_real_estate: { type: graphql_1.GraphQLFloat },
    },
    resolve(_, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id_real_estate } = args;
            const res = yield (0, answers_controller_1.get)(id_real_estate);
            return res;
        });
    },
};

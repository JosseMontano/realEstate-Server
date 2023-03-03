"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAnswer = void 0;
const graphql_1 = require("graphql");
const answer_1 = require("../typeDef/answer");
const answers_controller_1 = require("../../controllers/answers.controller");
exports.createAnswer = {
    type: answer_1.answerType,
    args: {
        answer: { type: graphql_1.GraphQLString },
        id_real_estate: { type: graphql_1.GraphQLFloat },
        id_question: { type: graphql_1.GraphQLFloat },
    },
    resolve(_, args) {
        const id = (0, answers_controller_1.create)(args);
        return Object.assign(Object.assign({}, args), { id });
    },
};

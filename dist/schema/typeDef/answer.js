"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.answerType = void 0;
const graphql_1 = require("graphql");
exports.answerType = new graphql_1.GraphQLObjectType({
    name: "answer",
    fields: {
        id: { type: graphql_1.GraphQLID },
        answer: { type: graphql_1.GraphQLString },
        id_real_estate: { type: graphql_1.GraphQLFloat },
        id_question: { type: graphql_1.GraphQLFloat },
        question: { type: graphql_1.GraphQLString }
    },
});

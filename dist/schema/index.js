"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const graphql_1 = require("graphql");
const answer_1 = require("./mutations/answer");
const answer_2 = require("./queries/answer");
const comments_1 = require("./queries/comments");
const comment_1 = require("./mutations/comment");
const comments_2 = require("./subscriptions/comments");
const realEstate_1 = require("./queries/realEstate");
const realEstate_2 = require("./mutations/realEstate");
const realEstate_3 = require("./subscriptions/realEstate");
const RootQuery = new graphql_1.GraphQLObjectType({
    name: "RootQuery",
    fields: {
        getAnswerQuestionByRealEstate: answer_2.getAnswerQuestionByRealEstate,
        getAllCommentsByUser: comments_1.getAllCommentsByUser,
        GET_REAL_ESTATE_BY_ID_USER: realEstate_1.GET_REAL_ESTATE_BY_ID_USER,
    },
});
const Mutation = new graphql_1.GraphQLObjectType({
    name: "Mutation",
    fields: {
        createAnswer: answer_1.createAnswer,
        CREATE_COMMENT: comment_1.CREATE_COMMENT,
        DELETE_COMMENT: comment_1.DELETE_COMMENT,
        DELETE_REAL_ESTATE: realEstate_2.DELETE_REAL_ESTATE,
        UPDATE_STATE_RE: realEstate_2.UPDATE_STATE_RE,
    },
});
const Subscription = new graphql_1.GraphQLObjectType({
    name: "Subscription",
    fields: {
        ADD_A_COMMENT: comments_2.ADD_A_COMMENT,
        DELETE_A_COMMENT: comments_2.DELETE_A_COMMENT,
        DELETE_A_RE: realEstate_3.DELETE_A_RE,
        UPDATE_STATE_A_RE: realEstate_3.UPDATE_STATE_A_RE
    },
});
exports.schema = new graphql_1.GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
    subscription: Subscription,
});

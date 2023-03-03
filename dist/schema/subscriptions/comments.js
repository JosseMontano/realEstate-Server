"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ADD_A_COMMENT = exports.DELETE_A_COMMENT = exports.pubsub = void 0;
const graphql_1 = require("graphql");
const type_1 = require("graphql/type");
const { PubSub } = require("graphql-subscriptions");
exports.pubsub = new PubSub();
//'fieds' is what it returns
const typeDefs = new graphql_1.GraphQLObjectType({
    name: "DELETE_A_COMMENT",
    fields: {
        id: { type: graphql_1.GraphQLFloat },
    },
});
exports.DELETE_A_COMMENT = {
    type: typeDefs,
    subscribe: () => exports.pubsub.asyncIterator("DELETE_A_COMMENT"),
};
const typeDefsAddComment = new graphql_1.GraphQLObjectType({
    name: "ADD_A_COMMENT",
    fields: {
        id: { type: type_1.GraphQLID },
        commentator: { type: graphql_1.GraphQLFloat },
        description: { type: type_1.GraphQLString },
        amount_start: { type: graphql_1.GraphQLFloat },
    },
});
exports.ADD_A_COMMENT = {
    type: typeDefsAddComment,
    subscribe: () => exports.pubsub.asyncIterator("ADD_A_COMMENT"),
};

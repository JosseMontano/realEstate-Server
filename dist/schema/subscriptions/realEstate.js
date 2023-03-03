"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UPDATE_STATE_A_RE = exports.DELETE_A_RE = exports.pubsub = void 0;
const graphql_1 = require("graphql");
const { PubSub } = require("graphql-subscriptions");
exports.pubsub = new PubSub();
//'fieds' is what it returns
const typeDefs = new graphql_1.GraphQLObjectType({
    name: "DELETE_A_RE",
    fields: {
        id: { type: graphql_1.GraphQLFloat },
    },
});
exports.DELETE_A_RE = {
    type: typeDefs,
    subscribe: () => exports.pubsub.asyncIterator("DELETE_A_RE"),
};
const typeUpdateStateDefs = new graphql_1.GraphQLObjectType({
    name: "UPDATE_STATE_A_RE",
    fields: {
        id: { type: graphql_1.GraphQLID },
        state: { type: graphql_1.GraphQLFloat },
    },
});
exports.UPDATE_STATE_A_RE = {
    type: typeUpdateStateDefs,
    subscribe: () => exports.pubsub.asyncIterator("UPDATE_STATE_A_RE"),
};

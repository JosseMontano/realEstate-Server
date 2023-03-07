"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentDeleteType = exports.commentType = void 0;
const graphql_1 = require("graphql");
exports.commentType = new graphql_1.GraphQLObjectType({
    name: "comment",
    fields: {
        id: { type: graphql_1.GraphQLID },
        email: { type: graphql_1.GraphQLString },
        id_comment: { type: graphql_1.GraphQLFloat },
        commentator: { type: graphql_1.GraphQLFloat },
        description: { type: graphql_1.GraphQLString },
        amount_start: { type: graphql_1.GraphQLFloat },
        url_photo: { type: graphql_1.GraphQLString },
    },
});
exports.commentDeleteType = new graphql_1.GraphQLObjectType({
    name: "commentDelete",
    fields: {
        id_comment: { type: graphql_1.GraphQLID },
    },
});

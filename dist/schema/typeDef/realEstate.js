"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.realEsateUpdateStateType = exports.realEstateDeleteType = exports.realEstateType = void 0;
const graphql_1 = require("graphql");
exports.realEstateType = new graphql_1.GraphQLObjectType({
    name: "realEstate",
    fields: {
        id_photo: { type: graphql_1.GraphQLFloat },
        id_real_estate_photo: { type: graphql_1.GraphQLFloat },
        id_real_estate: { type: graphql_1.GraphQLFloat },
        id_user: { type: graphql_1.GraphQLFloat },
        url: { type: graphql_1.GraphQLString },
        title: { type: graphql_1.GraphQLString },
        description: { type: graphql_1.GraphQLString },
        public_id: { type: graphql_1.GraphQLFloat },
        email: { type: graphql_1.GraphQLString },
        cellphone_number: { type: graphql_1.GraphQLFloat },
        available: { type: graphql_1.GraphQLBoolean },
    },
});
exports.realEstateDeleteType = new graphql_1.GraphQLObjectType({
    name: "realEstateDelete",
    fields: {
        idrealestate: { type: graphql_1.GraphQLID },
    },
});
exports.realEsateUpdateStateType = new graphql_1.GraphQLObjectType({
    name: "realEstateUpdayeState",
    fields: {
        idRealEstate: { type: graphql_1.GraphQLID },
        state: { type: graphql_1.GraphQLFloat },
    },
});

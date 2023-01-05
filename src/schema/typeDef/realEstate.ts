import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";

export const realEstateType = new GraphQLObjectType({
  name: "realEstate",
  fields: {
    idphoto: { type: GraphQLFloat },
    idrealestatephoto: { type: GraphQLFloat },
    idrealestate: { type: GraphQLFloat },
    iduser: { type: GraphQLFloat },
    url: { type: GraphQLString },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    publicId: { type: GraphQLFloat },
    email: { type: GraphQLString },
    cellphonenumber: { type: GraphQLFloat },
    available: { type: GraphQLBoolean },
  },
});

export const realEstateDeleteType = new GraphQLObjectType({
  name: "realEstateDelete",
  fields: {
    idrealestate: { type: GraphQLID },
  },
});

export const realEsateUpdateStateType = new GraphQLObjectType({
  name: "realEstateUpdayeState",
  fields: {
    idRealEstate: { type: GraphQLID },
    state: { type: GraphQLFloat},
  },
});

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
    id_photo: { type: GraphQLFloat },
    id_real_estate_photo: { type: GraphQLFloat },
    id_real_estate: { type: GraphQLFloat },
    id_user: { type: GraphQLFloat },
    url: { type: GraphQLString },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    public_id: { type: GraphQLFloat },
    email: { type: GraphQLString },
    cellphone_number: { type: GraphQLFloat },
    available: { type: GraphQLBoolean },
    amount_bedroom: { type: GraphQLFloat },
    price: { type: GraphQLFloat },
    amount_bathroom: { type: GraphQLFloat },
    square_meter: { type: GraphQLFloat },
    lat_long: { type: GraphQLString },
    address: { type: GraphQLString },
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
    state: { type: GraphQLFloat },
  },
});

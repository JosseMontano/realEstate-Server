import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLID,
} from "graphql";

export const commentType = new GraphQLObjectType({
  name: "comment",
  fields: {
    id: { type: GraphQLID },
    email: { type: GraphQLString },
    id_comment: { type: GraphQLFloat },
    commentator: { type: GraphQLFloat },
    description: { type: GraphQLString },
    amount_start: { type: GraphQLFloat },
    url: { type: GraphQLString },
  },
});

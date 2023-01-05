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

export const commentDeleteType = new GraphQLObjectType({
  name: "commentDelete",
  fields: {
    id_comment: { type: GraphQLID },
  },
});

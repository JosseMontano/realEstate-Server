import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLID,
} from "graphql";

export const answerType = new GraphQLObjectType({
  name: "answer",
  fields: {
    id: { type: GraphQLID },
    answer: { type: GraphQLString },
    id_real_estate: { type: GraphQLFloat },
    id_question: { type: GraphQLFloat },
    question:{type: GraphQLString}
  },
});

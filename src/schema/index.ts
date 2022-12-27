import { GraphQLSchema, GraphQLObjectType } from "graphql";
import { createAnswer } from "./mutations/answer";
import { getAnswerQuestionByRealEstate } from "./queries/answer";
const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    getAnswerQuestionByRealEstate,
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createAnswer,
  },
});

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});

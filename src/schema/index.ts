import { GraphQLSchema, GraphQLObjectType } from "graphql";
import { createAnswer } from "./mutations/answer";
import { getAnswerQuestionByRealEstate } from "./queries/answer";
import { getAllCommentsByUser } from "./queries/comments";
import { CREATE_COMMENT, DELETE_COMMENT } from "./mutations/comment";
import { DELETE_A_COMMENT, ADD_A_COMMENT } from "./subscriptions/comments";
import { GET_REAL_ESTATE_BY_ID_USER } from "./queries/realEstate";
import { DELETE_REAL_ESTATE } from "./mutations/realEstate";
import { DELETE_A_RE } from "./subscriptions/realEstate";

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    getAnswerQuestionByRealEstate,
    getAllCommentsByUser,
    GET_REAL_ESTATE_BY_ID_USER,
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createAnswer,
    CREATE_COMMENT,
    DELETE_COMMENT,
    DELETE_REAL_ESTATE,
  },
});

const Subscription = new GraphQLObjectType({
  name: "Subscription",
  fields: {
    ADD_A_COMMENT,
    DELETE_A_COMMENT,
    DELETE_A_RE,
  },
});

export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
  subscription: Subscription,
});

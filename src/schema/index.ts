import { GraphQLSchema, GraphQLObjectType } from "graphql";
import { createAnswer } from "./mutations/answer";
import { getAnswerQuestionByRealEstate } from "./queries/answer";
import { getAllCommentsByUser } from "./queries/comments";
import { CREATE_COMMENT } from "./mutations/comment";
import { DELETE_COMMENT } from "./mutations/comment";
import { DELETE_A_COMMENT} from "./subscriptions/comments";

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    getAnswerQuestionByRealEstate,
    getAllCommentsByUser,
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    createAnswer,
    CREATE_COMMENT,
    DELETE_COMMENT,
  },
});

 const Subscription = new GraphQLObjectType({
  name: "Subscription",
  fields:{
    DELETE_A_COMMENT
  }
}) 
 
export const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
  subscription:Subscription,  
});

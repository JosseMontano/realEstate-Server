import { GraphQLFloat, GraphQLObjectType } from "graphql";
import Comments from "../../interfaces/comments";
const { PubSub } = require("graphql-subscriptions");

export const pubsub = new PubSub();

/* email: String
id_comment: Float
commentator: Float
description: String
amount_start: Float
url: String  */



//'fieds' is what it returns
const typeDefs = new GraphQLObjectType({
    name: "DELETE_A_COMMENT",
    fields: {
      id: { type: GraphQLFloat },
    },
  });
  

export const DELETE_A_COMMENT = {
  type: typeDefs,
  subscribe: () => pubsub.asyncIterator("DELETE_A_COMMENT"),
};



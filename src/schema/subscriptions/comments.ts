import { GraphQLBoolean, GraphQLFloat, GraphQLID, GraphQLObjectType } from "graphql";
import Comments from "../../interfaces/comments";
const { PubSub } = require("graphql-subscriptions");
const gql = require("graphql-tag");
/* import { makeExecutableSchema } from "graphql-tools"; */

export const pubsub = new PubSub();

/* email: String
id_comment: Float
commentator: Float
description: String
amount_start: Float
url: String  */

/* const typeDefs = gql`
  type comment {
    id: ID
  }
  type Subscription {
    DELETE_A_COMMENT: comment
  }
`; */

const resolvers = {
  Subscription: {
    DELETE_A_COMMENT: {
      subscribe: () => pubsub.asyncIterator("DELETE_A_COMMENT"),
    },
  },
};

/* export const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
}); */

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



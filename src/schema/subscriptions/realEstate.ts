import { GraphQLFloat, GraphQLID, GraphQLObjectType } from "graphql";
const { PubSub } = require("graphql-subscriptions");

export const pubsub = new PubSub();

//'fieds' is what it returns
const typeDefs = new GraphQLObjectType({
  name: "DELETE_A_RE",
  fields: {
    id: { type: GraphQLFloat },
  },
});

export const DELETE_A_RE = {
  type: typeDefs,
  subscribe: () => pubsub.asyncIterator("DELETE_A_RE"),
};

const typeUpdateStateDefs = new GraphQLObjectType({
  name: "UPDATE_STATE_A_RE",
  fields: {
    id: { type: GraphQLID },
    state: { type: GraphQLFloat },
  },
});

export const UPDATE_STATE_A_RE = {
  type: typeUpdateStateDefs,
  subscribe: () => pubsub.asyncIterator("UPDATE_STATE_A_RE"),
};

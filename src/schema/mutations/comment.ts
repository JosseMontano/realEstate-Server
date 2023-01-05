import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
  GraphQLString,
} from "graphql";
import Comments from "../../interfaces/comments";
import { commentDeleteType, commentType } from "../typeDef/comment";
import { createComment } from "../../controllers/comments.controller";
import { deleteComment } from "../../controllers/comments.controller";
import { pubsub } from "../subscriptions/comments";

export const CREATE_COMMENT = {
  type: commentType, //lo que devuelve
  args: {
    commentator: { type: GraphQLFloat },
    description: { type: GraphQLString },
    person_commented: { type: GraphQLFloat },
    amount_start: { type: GraphQLFloat },
  },
  async resolve(_: any, args: Comments) {
    const id = await createComment(args);
    const obj = {
      commentator: args.commentator,
      description: args.description,
      person_commented: args.person_commented,
      amount_start: args.amount_start,
    };
    if (id) {
      await pubsub.publish("ADD_A_COMMENT", {
        ADD_A_COMMENT: { ...obj, id },
      });
    }
    return { ...args, id };
  },
};

export const DELETE_COMMENT = {
  type: commentDeleteType,
  args: {
    id: { type: GraphQLID },
  },
  async resolve(_: any, { id }: Comments) {
    const res = await deleteComment(id);
    const obj = {
      id,
    };
    if (res) {
      await pubsub.publish("DELETE_A_COMMENT", {
        DELETE_A_COMMENT: obj,
      });
    }
    return res;
  },
};

import {
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID,
  GraphQLString,
} from "graphql";
import Comments from "../../interfaces/comments";
import { commentType } from "../typeDef/comment";
import { createComment } from "../../controllers/comments.controller";
import { deleteComment } from "../../controllers/comments.controller";
export const CREATE_COMMENT = {
  type: commentType,
  args: {
    commentator: { type: GraphQLFloat },
    description: { type: GraphQLString },
    person_commented: { type: GraphQLFloat },
    amount_start: { type: GraphQLFloat },
  },
  async resolve(_: any, args: Comments) {
    const id = await createComment(args);
    return { ...args, id };
  },
};

export const DELETE_COMMENT = {
  type: GraphQLBoolean,
  args: {
    id: { type: GraphQLID },
  },
  async resolve(_: any, { id }: Comments) {
    const res = await deleteComment(id);
    return res;
  },
};

import { GraphQLFloat, GraphQLList } from "graphql";
import { getAllCommentsByUserSer } from "../../controllers/comments.controller";
import { commentType } from "../typeDef/comment";
import CommentsType from "../../interfaces/comments";

export const getAllCommentsByUser = {
  type: new GraphQLList(commentType),
  args: {
    person_commented: { type: GraphQLFloat },
  },
  async resolve(_: any, args: CommentsType) {
    const { person_commented } = args;
    const res = getAllCommentsByUserSer(person_commented);
    return res;
  },
};

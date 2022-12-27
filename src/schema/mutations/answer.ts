import { GraphQLString, GraphQLFloat } from "graphql";
import { answerType } from "../typeDef/answer";
import { create } from "../../controllers/answers.controller";
import Answer from "../../interfaces/answer";
export const createAnswer = {
  type: answerType,
  args: {
    answer: { type: GraphQLString },
    id_real_estate: { type: GraphQLFloat },
    id_question: { type: GraphQLFloat },
  },
  resolve(_: any, args: Answer) {
    const id = create(args);
    return { ...args, id };
  },
};

import { GraphQLString, GraphQLFloat, GraphQLList } from "graphql";
import { get } from "../../controllers/answers.controller";
import Answer from "../../interfaces/answer";
import { answerType } from "../typeDef/answer";

export const getAnswerQuestionByRealEstate = {
  type: new GraphQLList(answerType),
  args: {
    id_real_estate: { type: GraphQLFloat },
  },
  async resolve(_: any, args: Answer) {
    const { id_real_estate } = args;
    const res = await get(id_real_estate);
    return res;
  },
};

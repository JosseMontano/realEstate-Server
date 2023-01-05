import { GraphQLFloat, GraphQLList } from "graphql/type";
import { getEstateByUser } from "../../controllers/realEstate.controller";
import { realEstateType } from "../typeDef/realEstate";

interface ArgsType {
  idUser: number;
}

export const GET_REAL_ESTATE_BY_ID_USER = {
  type: new GraphQLList(realEstateType),
  args: {
    idUser: { type: GraphQLFloat },
  },
  async resolve(_: any, args: ArgsType) {
    const { idUser } = args;
    const res = await getEstateByUser(idUser);
    return res;
  },
};

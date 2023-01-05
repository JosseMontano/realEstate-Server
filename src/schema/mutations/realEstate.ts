import { GraphQLFloat, GraphQLID } from "graphql";
import { deleteEstate } from "../../controllers/realEstate.controller";
import { realEstateDeleteType } from "../typeDef/realEstate";
import { pubsub } from "../subscriptions/realEstate";

export const DELETE_REAL_ESTATE = {
  type: realEstateDeleteType,
  args: {
    idRealEstatePhoto: { type: GraphQLFloat },
    idPhoto: { type: GraphQLFloat },
    idRealEstate: { type: GraphQLID },
  },
  async resolve(_: any, args: any) {
    const { idRealEstate, idRealEstatePhoto, idPhoto } = args;
    const res = await deleteEstate(idRealEstatePhoto, idPhoto, idRealEstate);
    const obj = {
      id: idRealEstate,
    };
    if (res) {
      await pubsub.publish("DELETE_A_RE", {
        DELETE_A_RE: obj,
      });
    }
    return {
      idRealEstate: idRealEstate,
    };
  },
};

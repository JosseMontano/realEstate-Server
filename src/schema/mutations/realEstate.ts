import { GraphQLFloat, GraphQLID } from "graphql";
import {
  deleteEstate,
  updateStateAvailable,
} from "../../controllers/realEstate.controller";
import {
  realEstateDeleteType,
  realEsateUpdateStateType,
} from "../typeDef/realEstate";
import { pubsub } from "../subscriptions/realEstate";
import { GraphQLBoolean } from "graphql/type";

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

export const UPDATE_STATE_RE = {
  type: realEsateUpdateStateType,
  args: {
    idRealEstate: { type: GraphQLID },
    state: { type: GraphQLFloat },
  },
  async resolve(_: any, args: any) {
    const { idRealEstate, state } = args;
    const res = await updateStateAvailable(idRealEstate, state);
    const obj = {
      id: idRealEstate,
      state,
    };
    if (res) {
      await pubsub.publish("UPDATE_STATE_A_RE", {
        UPDATE_STATE_A_RE: obj,
      });
      return {
        idRealEstate,
        state,
      };
    }
    return null;
  },
};

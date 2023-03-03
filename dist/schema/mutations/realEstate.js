"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UPDATE_STATE_RE = exports.DELETE_REAL_ESTATE = void 0;
const graphql_1 = require("graphql");
const realEstate_controller_1 = require("../../controllers/realEstate.controller");
const realEstate_1 = require("../typeDef/realEstate");
const realEstate_2 = require("../subscriptions/realEstate");
exports.DELETE_REAL_ESTATE = {
    type: realEstate_1.realEstateDeleteType,
    args: {
        idRealEstatePhoto: { type: graphql_1.GraphQLFloat },
        idPhoto: { type: graphql_1.GraphQLFloat },
        idRealEstate: { type: graphql_1.GraphQLID },
    },
    resolve(_, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idRealEstate, idRealEstatePhoto, idPhoto } = args;
            const res = yield (0, realEstate_controller_1.deleteEstate)(idRealEstatePhoto, idPhoto, idRealEstate);
            const obj = {
                id: idRealEstate,
            };
            if (res) {
                yield realEstate_2.pubsub.publish("DELETE_A_RE", {
                    DELETE_A_RE: obj,
                });
            }
            return {
                idRealEstate: idRealEstate,
            };
        });
    },
};
exports.UPDATE_STATE_RE = {
    type: realEstate_1.realEsateUpdateStateType,
    args: {
        idRealEstate: { type: graphql_1.GraphQLID },
        state: { type: graphql_1.GraphQLFloat },
    },
    resolve(_, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idRealEstate, state } = args;
            const res = yield (0, realEstate_controller_1.updateStateAvailable)(idRealEstate, state);
            const obj = {
                id: idRealEstate,
                state,
            };
            if (res) {
                yield realEstate_2.pubsub.publish("UPDATE_STATE_A_RE", {
                    UPDATE_STATE_A_RE: obj,
                });
                return {
                    idRealEstate,
                    state,
                };
            }
            return null;
        });
    },
};

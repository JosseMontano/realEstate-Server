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
exports.GET_REAL_ESTATE_BY_ID_USER = void 0;
const type_1 = require("graphql/type");
const realEstate_controller_1 = require("../../controllers/realEstate.controller");
const realEstate_1 = require("../typeDef/realEstate");
exports.GET_REAL_ESTATE_BY_ID_USER = {
    type: new type_1.GraphQLList(realEstate_1.realEstateType),
    args: {
        idUser: { type: type_1.GraphQLFloat },
    },
    resolve(_, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { idUser } = args;
            const res = yield (0, realEstate_controller_1.getEstateByUser)(idUser);
            return res;
        });
    },
};

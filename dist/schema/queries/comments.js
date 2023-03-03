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
exports.getAllCommentsByUser = void 0;
const graphql_1 = require("graphql");
const comments_controller_1 = require("../../controllers/comments.controller");
const comment_1 = require("../typeDef/comment");
exports.getAllCommentsByUser = {
    type: new graphql_1.GraphQLList(comment_1.commentType),
    args: {
        person_commented: { type: graphql_1.GraphQLFloat },
    },
    resolve(_, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const { person_commented } = args;
            const res = (0, comments_controller_1.getAllCommentsByUserSer)(person_commented);
            return res;
        });
    },
};

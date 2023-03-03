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
exports.DELETE_COMMENT = exports.CREATE_COMMENT = void 0;
const graphql_1 = require("graphql");
const comment_1 = require("../typeDef/comment");
const comments_controller_1 = require("../../controllers/comments.controller");
const comments_controller_2 = require("../../controllers/comments.controller");
const comments_1 = require("../subscriptions/comments");
exports.CREATE_COMMENT = {
    type: comment_1.commentType,
    args: {
        commentator: { type: graphql_1.GraphQLFloat },
        description: { type: graphql_1.GraphQLString },
        person_commented: { type: graphql_1.GraphQLFloat },
        amount_start: { type: graphql_1.GraphQLFloat },
    },
    resolve(_, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = yield (0, comments_controller_1.createComment)(args);
            const obj = {
                commentator: args.commentator,
                description: args.description,
                person_commented: args.person_commented,
                amount_start: args.amount_start,
            };
            if (id) {
                yield comments_1.pubsub.publish("ADD_A_COMMENT", {
                    ADD_A_COMMENT: Object.assign(Object.assign({}, obj), { id }),
                });
            }
            return Object.assign(Object.assign({}, args), { id });
        });
    },
};
exports.DELETE_COMMENT = {
    type: comment_1.commentDeleteType,
    args: {
        id: { type: graphql_1.GraphQLID },
    },
    resolve(_, { id }) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield (0, comments_controller_2.deleteComment)(id);
            const obj = {
                id,
            };
            if (res) {
                yield comments_1.pubsub.publish("DELETE_A_COMMENT", {
                    DELETE_A_COMMENT: obj,
                });
            }
            return res;
        });
    },
};

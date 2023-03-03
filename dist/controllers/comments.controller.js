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
exports.deleteComment = exports.createComment = exports.getAllCommentsByUserSer = void 0;
const zod_1 = require("zod");
const pool = require("../db");
const QuestionSchema = zod_1.z.object({
    description: zod_1.z.string().min(2),
    commentator: zod_1.z.number().nonnegative(),
    person_commented: zod_1.z.number().nonnegative(),
    amount_start: zod_1.z.number().nonnegative(),
});
const getAllCommentsByUserSer = (person_commented) => __awaiter(void 0, void 0, void 0, function* () {
    const allComments = yield pool.query(`select u.email, c.id as id_comment, c.commentator, c.description,c.amount_start, p.url
      from comments c, users u, photos p
      where c.commentator = u.id and c.person_commented = $1 and u.id_photo=p.id
      `, [person_commented]);
    return allComments.rows;
});
exports.getAllCommentsByUserSer = getAllCommentsByUserSer;
const createComment = (comments) => __awaiter(void 0, void 0, void 0, function* () {
    //save data of the realEstate
    QuestionSchema.parse(comments);
    const { amount_start, commentator, person_commented, description } = comments;
    const result = yield pool.query("insert into comments (description, commentator, person_commented, amount_start) values ($1, $2, $3, $4) returning *", [description, commentator, person_commented, amount_start]);
    const amountStarBD = yield pool.query(`
        select * from users where id= $1
        `, [person_commented]);
    let amountStartBDUnique = amountStarBD.rows[0].qualification;
    amountStartBDUnique = parseFloat(amountStartBDUnique) + amount_start;
    const updateAmountStartUser = yield pool.query("update users set qualification=$1 where id=$2 returning *", [amountStartBDUnique, person_commented]);
    return result.rows[0].id;
});
exports.createComment = createComment;
const deleteComment = (id) => __awaiter(void 0, void 0, void 0, function* () {
    //delete data real Estates
    const resRealEstate = yield pool.query("delete from comments where id=$1", [
        id,
    ]);
    if (resRealEstate.rowCount === 0)
        return false;
    return true;
});
exports.deleteComment = deleteComment;

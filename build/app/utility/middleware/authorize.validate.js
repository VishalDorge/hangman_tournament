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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentAuthorization = exports.creatorAuthorization = void 0;
const constants_1 = require("../constants");
const user_services_1 = __importDefault(require("../../feature-modules/user/user.services"));
const comment_services_1 = __importDefault(require("../../feature-modules/comments/comment.services"));
const comment_responses_1 = require("../../feature-modules/comments/comment.responses");
const creatorAuthorization = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, role } = res.locals.payload;
    if (role === constants_1.roles.ADMIN)
        return next();
    req.query = Object.assign(Object.assign({}, req.query), { creator: id });
    return next();
});
exports.creatorAuthorization = creatorAuthorization;
const commentAuthorization = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, role } = res.locals.payload;
    const { commentData } = req.body;
    if (role === constants_1.roles.ADMIN)
        return next();
    const comment = yield comment_services_1.default.findOne({ _id: commentData.commentId });
    if (!comment)
        throw comment_responses_1.commentResponses.UNABLE_TO_PROCEED;
    const user = yield user_services_1.default.findOne({ _id: id });
    if (comment.user == id) {
        const { commentId, message } = commentData, restCommentData = __rest(commentData, ["commentId", "message"]);
        req.body.commentData = { commentId, message };
        return next();
    }
    else if (user === null || user === void 0 ? void 0 : user.isModerator) {
        const { commentId, isFlagged } = commentData, restCommentData = __rest(commentData, ["commentId", "isFlagged"]);
        req.body.commendData = { commentId, isFlagged };
        return next();
    }
    else
        return next({ statusCode: 403, message: "FORBIDDEN!!!" });
});
exports.commentAuthorization = commentAuthorization;

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
const comment_repo_1 = __importDefault(require("./comment.repo"));
const generate_pipeline_1 = require("../../utility/generate.pipeline");
const tournament_services_1 = __importDefault(require("../tournament/tournament.services"));
const constants_1 = require("../../utility/constants");
const comment_responses_1 = require("./comment.responses");
const user_services_1 = __importDefault(require("../user/user.services"));
const notification_services_1 = __importDefault(require("../notification/notification.services"));
const notification_data_1 = require("../notification/notification.data");
const add = (user, commentCredentials) => __awaiter(void 0, void 0, void 0, function* () {
    const tournament = yield tournament_services_1.default.findOne({ _id: commentCredentials.tournament, status: { $ne: constants_1.statuses.REJECTED } });
    if (!tournament)
        throw comment_responses_1.commentResponses.UNABLE_TO_PROCEED;
    const type = (tournament === null || tournament === void 0 ? void 0 : tournament.status) == constants_1.statuses.APPROVED ? 1 : 2;
    const comment = Object.assign(Object.assign({ user }, commentCredentials), { type });
    if (type === 2) {
        user === constants_1.Admins.ADMIN ?
            yield notification_services_1.default.add(tournament.creator, notification_data_1.notificationTypes.PRIVATE_MESSAGE_TO_USER, commentCredentials.tournament) :
            yield notification_services_1.default.add(constants_1.Admins.ADMIN, notification_data_1.notificationTypes.PRIVATE_MESSAGE_TO_ADMIN, commentCredentials.tournament);
    }
    else {
        yield notification_services_1.default.add(tournament.creator, notification_data_1.notificationTypes.PUBLIC_COMMENT, commentCredentials.tournament, user);
    }
    return comment_repo_1.default.create(comment);
});
const findOne = (filter) => comment_repo_1.default.findOne(filter);
const update = (filter, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield comment_repo_1.default.update(filter, data);
    if (result.modifiedCount <= 0)
        throw comment_responses_1.commentResponses.UNABLE_TO_PROCEED;
    else
        return comment_responses_1.commentResponses.UPDATE_SUCCESS;
});
const updateComment = (commentData) => __awaiter(void 0, void 0, void 0, function* () {
    const { commentId } = commentData, restCommentData = __rest(commentData, ["commentId"]);
    return yield update({ _id: commentId }, restCommentData);
});
const remove = (userId, commentId) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_services_1.default.findOne({ _id: userId });
    const comment = yield findOne({ _id: commentId });
    if ((user === null || user === void 0 ? void 0 : user.role) == constants_1.roles.ADMIN || (comment === null || comment === void 0 ? void 0 : comment.user) == userId) {
        const result = yield comment_repo_1.default.update({ _id: commentId }, { isDeleted: true });
        if (result.modifiedCount > 0)
            return comment_responses_1.commentResponses.DELETE_SUCCESS;
    }
    throw comment_responses_1.commentResponses.UNABLE_TO_PROCEED;
});
const find = (query) => {
    const pipeline = new generate_pipeline_1.CustomPipeline(query).generate();
    return comment_repo_1.default.aggregation(pipeline);
};
exports.default = {
    add,
    findOne,
    update,
    updateComment,
    remove,
    find
};

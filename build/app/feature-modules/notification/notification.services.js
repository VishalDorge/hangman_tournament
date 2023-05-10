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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const notification_repo_1 = __importDefault(require("./notification.repo"));
const notification_responses_1 = require("./notification.responses");
const notification_data_1 = require("./notification.data");
const comment_services_1 = __importDefault(require("../comments/comment.services"));
const tournament_services_1 = __importDefault(require("../tournament/tournament.services"));
const user_services_1 = __importDefault(require("../user/user.services"));
const findOne = (filter) => notification_repo_1.default.findOne(filter);
const remove = (filter) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield notification_repo_1.default.update(filter, { isDeleted: true });
    if (result.modifiedCount <= 0)
        throw notification_responses_1.notificationResponses.UNABLE_TO_PROCEED;
    else
        return notification_responses_1.notificationResponses.DELETE_SUCCESS;
});
const messageBuilder = (type, id, secondId = "") => __awaiter(void 0, void 0, void 0, function* () {
    if (type === notification_data_1.notificationTypes.COMMENT_FLAGGED) {
        const comment = yield comment_services_1.default.findOne({ _id: id, isFlagged: true });
        const tournament = yield tournament_services_1.default.findOne({ _id: comment === null || comment === void 0 ? void 0 : comment.tournament });
        return `Your Comment on Tournament ${tournament === null || tournament === void 0 ? void 0 : tournament.name} has Been Flagged`;
    }
    else if (type === notification_data_1.notificationTypes.GAME_WON) {
        const tournament = yield tournament_services_1.default.findOne({ _id: id });
        return `You score a Top Rank in Tournament ${tournament === null || tournament === void 0 ? void 0 : tournament.name}`;
    }
    else if (type === notification_data_1.notificationTypes.TOURNAMENT_APPROVED) {
        const tournament = yield tournament_services_1.default.findOne({ _id: id });
        return `Your tournament : ${tournament === null || tournament === void 0 ? void 0 : tournament.name} is Approved`;
    }
    else if (type === notification_data_1.notificationTypes.TOURNAMENT_REJECTED) {
        const tournament = yield tournament_services_1.default.findOne({ _id: id });
        return `Your tournament : ${tournament === null || tournament === void 0 ? void 0 : tournament.name} is Rejected`;
    }
    else if (type === notification_data_1.notificationTypes.TOURNAMENT_SUBMITED_PLAYER) {
        return `Your tournament : ${id} is Submitted for Review`;
    }
    else if (type === notification_data_1.notificationTypes.TOURNAMENT_SUBMITED_ADMIN) {
        return `New Tournament : ${id} has been Submitted for Review`;
    }
    else if (type === notification_data_1.notificationTypes.TOURNAMENT_JOINED) {
        const tournament = yield tournament_services_1.default.findOne({ _id: id });
        return `You Successfully joined to ${tournament === null || tournament === void 0 ? void 0 : tournament.name} Tournament.`;
    }
    else if (type === notification_data_1.notificationTypes.SCORE_SUBMITTED) {
        const tournament = yield tournament_services_1.default.findOne({ _id: id });
        return `Your Score has been Submitted in ${tournament === null || tournament === void 0 ? void 0 : tournament.name}`;
    }
    else if (type === notification_data_1.notificationTypes.PRIVATE_MESSAGE_TO_USER) {
        const tournament = yield tournament_services_1.default.findOne({ _id: id });
        return `Admin Responded to your Tournament : ${tournament === null || tournament === void 0 ? void 0 : tournament.name}`;
    }
    else if (type === notification_data_1.notificationTypes.PRIVATE_MESSAGE_TO_ADMIN) {
        const tournament = yield tournament_services_1.default.findOne({ _id: id });
        const user = yield user_services_1.default.findOne({ _id: tournament === null || tournament === void 0 ? void 0 : tournament.creator });
        return `${user === null || user === void 0 ? void 0 : user.username} replied to your Feedback on Tournament ${tournament === null || tournament === void 0 ? void 0 : tournament.name}`;
    }
    else if (type === notification_data_1.notificationTypes.PUBLIC_COMMENT) {
        const tournament = yield tournament_services_1.default.findOne({ _id: id });
        const user = yield user_services_1.default.findOne({ _id: secondId });
        return `${user === null || user === void 0 ? void 0 : user.username} posted a new comment on your Tournament ${tournament === null || tournament === void 0 ? void 0 : tournament.name}`;
    }
    else
        throw notification_responses_1.notificationResponses.UNABLE_TO_PROCEED;
});
const add = (userId, type, id, secondId = "") => __awaiter(void 0, void 0, void 0, function* () {
    const notification = { userId, message: yield messageBuilder(type, id, secondId) };
    return notification_repo_1.default.create(notification);
});
exports.default = {
    findOne,
    add,
    remove,
};

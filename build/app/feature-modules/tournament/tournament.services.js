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
const tournament_repo_1 = __importDefault(require("./tournament.repo"));
const tournament_responses_1 = require("./tournament.responses");
const generate_pipeline_1 = require("../../utility/generate.pipeline");
const word_services_1 = __importDefault(require("../word/word.services"));
const constants_1 = require("../../utility/constants");
const notification_services_1 = __importDefault(require("../notification/notification.services"));
const notification_data_1 = require("../notification/notification.data");
const category_services_1 = __importDefault(require("../category/category.services"));
const findOne = (filter) => tournament_repo_1.default.findOne(filter);
const add = (tournamentCredentials, creator) => __awaiter(void 0, void 0, void 0, function* () {
    const oldTournament = yield findOne({
        name: tournamentCredentials.name,
        creator,
        isEnded: false
    });
    console.log(oldTournament);
    if (oldTournament)
        throw tournament_responses_1.tournamentResponses.UNABLE_TO_PROCEED;
    for (let category of tournamentCredentials.categories) {
        const isCategoryExist = yield category_services_1.default.findOne({ _id: category });
        if (!isCategoryExist)
            throw tournament_responses_1.tournamentResponses.UNABLE_TO_PROCEED;
    }
    yield notification_services_1.default.add(creator, notification_data_1.notificationTypes.TOURNAMENT_SUBMITED_PLAYER, tournamentCredentials.name);
    yield notification_services_1.default.add(constants_1.Admins.ADMIN, notification_data_1.notificationTypes.TOURNAMENT_SUBMITED_ADMIN, tournamentCredentials.name);
    const tournament = Object.assign(Object.assign({}, tournamentCredentials), { creator });
    return tournament_repo_1.default.create(tournament);
});
const update = (filter, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield tournament_repo_1.default.update(filter, data);
    if (result.modifiedCount <= 0)
        throw tournament_responses_1.tournamentResponses.UNABLE_TO_PROCEED;
    else
        return tournament_responses_1.tournamentResponses.UPDATE_SUCCESS;
});
const updateStatus = (tournamentId, status) => __awaiter(void 0, void 0, void 0, function* () {
    const tournament = yield findOne({ _id: tournamentId, status: constants_1.statuses.PENDING });
    if (!tournament)
        throw tournament_responses_1.tournamentResponses.UNABLE_TO_PROCEED;
    if (status === 0) {
        const result = yield tournament_repo_1.default.update({ _id: tournamentId }, { $set: { status: constants_1.statuses.REJECTED } });
        yield notification_services_1.default.add(tournament === null || tournament === void 0 ? void 0 : tournament.creator, notification_data_1.notificationTypes.TOURNAMENT_REJECTED, tournamentId);
        if (result.modifiedCount <= 0)
            throw tournament_responses_1.tournamentResponses.UNABLE_TO_PROCEED;
        else
            return tournament_responses_1.tournamentResponses.APPROVE_SUCCESS;
    }
    const wordIds = [];
    for (let wordObj of tournament.newWords) {
        const word = wordObj.word;
        const categories = wordObj.categories;
        const areAllCategoriesPresent = categories.every(category => tournament.categories.includes(category));
        if (!areAllCategoriesPresent)
            continue;
        const newWord = yield word_services_1.default.add({ words: [word], categories, level: tournament.level });
        if (newWord.successArray.length > 0)
            wordIds.push(newWord.successArray[0]._id);
    }
    const result = yield tournament_repo_1.default.update({ _id: tournamentId }, { $set: { status: constants_1.statuses.APPROVED, newWords: [] }, $push: { words: wordIds } });
    yield notification_services_1.default.add(tournament === null || tournament === void 0 ? void 0 : tournament.creator, notification_data_1.notificationTypes.TOURNAMENT_APPROVED, tournamentId);
    if (result.modifiedCount <= 0)
        throw tournament_responses_1.tournamentResponses.UNABLE_TO_PROCEED;
    else
        return tournament_responses_1.tournamentResponses.APPROVE_SUCCESS;
});
const remove = (filter) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield tournament_repo_1.default.update(filter, { isDeleted: true });
    if (result.modifiedCount <= 0)
        throw tournament_responses_1.tournamentResponses.UNABLE_TO_PROCEED;
    else
        return tournament_responses_1.tournamentResponses.DELETE_SUCCESS;
});
const find = (query) => {
    const pipeline = new generate_pipeline_1.CustomPipeline(query).generate();
    return tournament_repo_1.default.aggregation(pipeline);
};
const getPending = (query) => find(Object.assign(Object.assign({}, query), { status: constants_1.statuses.PENDING }));
const getApproved = (query) => find(Object.assign(Object.assign({}, query), { status: constants_1.statuses.APPROVED }));
const getRejected = (query) => find(Object.assign(Object.assign({}, query), { status: constants_1.statuses.REJECTED }));
exports.default = {
    findOne,
    add,
    update,
    updateStatus,
    remove,
    find,
    getPending,
    getApproved,
    getRejected
};

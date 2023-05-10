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
const leaderboard_repo_1 = __importDefault(require("./leaderboard.repo"));
const leaderboard_responses_1 = require("./leaderboard.responses");
const tournament_services_1 = __importDefault(require("../tournament/tournament.services"));
const constants_1 = require("../../utility/constants");
const generate_pipeline_1 = require("../../utility/generate.pipeline");
const notification_services_1 = __importDefault(require("../notification/notification.services"));
const notification_data_1 = require("../notification/notification.data");
const findOne = (filter) => leaderboard_repo_1.default.findOne(filter);
const add = (playerId, tournamentId) => __awaiter(void 0, void 0, void 0, function* () {
    const tournament = yield tournament_services_1.default.findOne({
        _id: tournamentId,
        status: constants_1.statuses.APPROVED,
        isEnded: false,
        creator: { $ne: playerId }
    });
    const oldLeaderboardEntry = yield findOne({
        user: playerId,
        tournament: tournamentId
    });
    if (!tournament || oldLeaderboardEntry)
        throw leaderboard_responses_1.leaderboardResponses.UNABLE_TO_PROCEED;
    const leaderboard = { user: playerId, tournament: tournamentId };
    yield notification_services_1.default.add(playerId, notification_data_1.notificationTypes.TOURNAMENT_JOINED, tournamentId);
    return leaderboard_repo_1.default.create(leaderboard);
});
const updatePlayerData = (playerId, playerData) => __awaiter(void 0, void 0, void 0, function* () {
    const tournament = yield tournament_services_1.default.findOne({
        _id: playerData.tournament,
        status: constants_1.statuses.APPROVED,
        isEnded: false,
        creator: { $ne: playerId }
    });
    if (!tournament)
        throw leaderboard_responses_1.leaderboardResponses.UNABLE_TO_PROCEED;
    let leaderboardEntry;
    const oldLeaderboardEntry = yield findOne({ user: playerId, tournament: playerData.tournament });
    if (!oldLeaderboardEntry) {
        leaderboardEntry = yield add(playerId, playerData.tournament);
    }
    else {
        if ((oldLeaderboardEntry === null || oldLeaderboardEntry === void 0 ? void 0 : oldLeaderboardEntry.time) !== "00:00:00" && oldLeaderboardEntry.score !== 0)
            throw leaderboard_responses_1.leaderboardResponses.UNABLE_TO_PROCEED;
        leaderboardEntry = oldLeaderboardEntry;
    }
    yield notification_services_1.default.add(playerId, notification_data_1.notificationTypes.SCORE_SUBMITTED, playerData.tournament);
    return update({ _id: leaderboardEntry }, {
        $set: {
            score: playerData.score,
            time: playerData.time
        }
    });
});
const update = (filter, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield leaderboard_repo_1.default.update(filter, data);
    if (result.modifiedCount <= 0)
        throw leaderboard_responses_1.leaderboardResponses.UNABLE_TO_PROCEED;
    else
        return leaderboard_responses_1.leaderboardResponses.UPDATE_SUCCESS;
});
const find = (query) => {
    const pipeline = new generate_pipeline_1.CustomPipeline(query).sortStage("score", "desc").generate();
    return leaderboard_repo_1.default.aggregation(pipeline);
};
exports.default = {
    findOne,
    find,
    add,
    update,
    updatePlayerData
};

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const leaderboard_schema_1 = require("./leaderboard.schema");
const findOne = (filter) => leaderboard_schema_1.leaderboardModel.findOne(Object.assign({ isDeleted: false }, filter));
const create = (leaderboard) => leaderboard_schema_1.leaderboardModel.create(leaderboard);
const update = (filter, data) => leaderboard_schema_1.leaderboardModel.updateMany(filter, data);
// const find = (filter: FilterQuery<ILeaderboard>) => leaderboardModel.find({isDeleted: false, ...filter});
const aggregation = (pipeline) => leaderboard_schema_1.leaderboardModel.aggregate(pipeline);
exports.default = {
    findOne,
    aggregation,
    create,
    update
};

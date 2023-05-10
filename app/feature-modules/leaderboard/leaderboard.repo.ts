import { FilterQuery, PipelineStage, UpdateQuery } from "mongoose";
import { ILeaderboard } from "./leaderboard.types";
import { leaderboardModel } from "./leaderboard.schema";

const findOne = (filter: FilterQuery<ILeaderboard>) => leaderboardModel.findOne({isDeleted: false, ...filter});

const create = (leaderboard: ILeaderboard) => leaderboardModel.create(leaderboard);

const update = (filter: FilterQuery<ILeaderboard>, data: UpdateQuery<ILeaderboard>) => leaderboardModel.updateMany(filter, data);

// const find = (filter: FilterQuery<ILeaderboard>) => leaderboardModel.find({isDeleted: false, ...filter});

const aggregation = (pipeline: PipelineStage[]) => leaderboardModel.aggregate(pipeline);

export default {
    findOne,
    aggregation,
    create,
    update
}
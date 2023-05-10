import { FilterQuery, PipelineStage, UpdateQuery } from "mongoose";
import { ITournament } from "./tournament.types";
import { tournamentModel } from "./tournament.schema";

const findOne = (filter: FilterQuery<ITournament>) => tournamentModel.findOne({isDeleted: false, ...filter});

const create = (tournament: ITournament) => tournamentModel.create(tournament);

const update = (filter: FilterQuery<ITournament>, data: UpdateQuery<ITournament>) => tournamentModel.updateMany(filter, data);

const aggregation = (pipeline: PipelineStage[]) => tournamentModel.aggregate(pipeline);

export default {
    findOne,
    create,
    update,
    aggregation
}
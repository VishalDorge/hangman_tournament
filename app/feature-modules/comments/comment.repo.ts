import { FilterQuery, PipelineStage, UpdateQuery } from "mongoose";
import { commentModel } from "./comment.schema";
import { IComment } from "./comment.types";

const create = (comment: IComment) => commentModel.create(comment);
const findOne = (filter: FilterQuery<IComment>) => commentModel.findOne({isDeleted: false, ...filter});

const update = (filter: FilterQuery<IComment>, data: UpdateQuery<IComment>) => {
    return commentModel.updateMany({isDeleted: false, ...filter}, data);
}

const aggregation = (pipeline: PipelineStage[]) => commentModel.aggregate(pipeline);

export default {
    create,
    findOne,
    update,
    aggregation
}
import { FilterQuery, PipelineStage, UpdateQuery } from "mongoose";
import { IWord } from "./word.types";
import { wordModel } from "./word.schema";


const findOne = (filter: FilterQuery<IWord>) => wordModel.findOne({isDeleted: false, ...filter});

const create = (word: IWord) => wordModel.create(word);

const update = (filter: FilterQuery<IWord>, data: UpdateQuery<IWord>) => wordModel.updateMany(filter, data);

const aggregation = (pipeline: PipelineStage[]) => wordModel.aggregate(pipeline);

export default {
    findOne,
    create,
    update,
    aggregation
}
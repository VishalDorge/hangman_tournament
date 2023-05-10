import { FilterQuery, PipelineStage, UpdateQuery } from "mongoose";
import { ICategory } from "./category.types";
import { categoryModel } from "./category.schema";


const findOne = (filter: FilterQuery<ICategory>) => categoryModel.findOne({isDeleted: false, ...filter});

const create = (category: ICategory) => categoryModel.create(category);

const update = (filter: FilterQuery<ICategory>, data: UpdateQuery<ICategory>) => {
    return categoryModel.updateMany(filter, data);
}

const aggregation = (pipeline: PipelineStage[]) => categoryModel.aggregate(pipeline);

export default {
    findOne,
    create,
    update,
    aggregation
}
import { FilterQuery, UpdateQuery } from "mongoose";
import { ICategory } from "./category.types";
import categoryRepo from "./category.repo";
import { categoryResponses } from "./category.responses";
import { CustomPipeline } from "../../utility/generate.pipeline";
import { customQuery } from "../../utility/constants";

const findOne = (filter: FilterQuery<ICategory>) => categoryRepo.findOne(filter);

const add = (category: ICategory) => categoryRepo.create(category);

const update = async (filter: FilterQuery<ICategory>, data: UpdateQuery<ICategory>) => {
    const result = await categoryRepo.update(filter, data);
    if(result.modifiedCount <= 0) throw categoryResponses.UNABLE_TO_PROCEED;
    return categoryResponses.UPDATE_SUCCESS;
}

const remove = async (filter: FilterQuery<ICategory>) => {
    const result = await categoryRepo.update(filter, {isDeleted: true});
    if(result.modifiedCount <= 0) throw categoryResponses.UNABLE_TO_PROCEED;
    return categoryResponses.DELETE_SUCCESS;
}

const find = (query: customQuery) => {
    const pipeline = new CustomPipeline(query).generate();
    return categoryRepo.aggregation(pipeline);
}

export default {
    findOne,
    find,
    add,
    update,
    remove
}
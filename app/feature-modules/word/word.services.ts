import { FilterQuery, UpdateQuery } from "mongoose";
import { IWord, IWordsData } from "./word.types";
import wordRepo from "./word.repo";
import { wordResponses } from "./word.responses";
import { CustomPipeline } from "../../utility/generate.pipeline";
import { customQuery } from "../../utility/constants";

const findOne = (filter: FilterQuery<IWord>) => wordRepo.findOne(filter);

const add = async (wordsData: IWordsData) => {
    const { categories, level, words } = wordsData;
    const successArray: IWord[] = [];
    const failureArray: string[] = [];

    for (let word of words) {
        try {
            const result = await wordRepo.create({ word, categories, level });
            successArray.push(result);
        } catch (err: any) { failureArray.push(word) }
    }

    return { successArray, failureArray };
}

const update = async (filter: FilterQuery<IWord>, data: UpdateQuery<IWord>) => {
    const result = await wordRepo.update(filter, data);
    if (result.modifiedCount <= 0) throw wordResponses.UNABLE_TO_PROCEED;
    else return wordResponses.UPDATE_SUCCESS;
}

const remove = async (filter: FilterQuery<IWord>) => {
    const result = await wordRepo.update(filter, { isDeleted: true });
    if (result.modifiedCount <= 0) throw wordResponses.UNABLE_TO_PROCEED;
    else return wordResponses.DELETE_SUCCESS;
}

const find = async (queryData: customQuery) => {
    const { search, ...query } = queryData;
    const pipeline = new CustomPipeline(query).unWindStage("categories").generate();
    const result = await wordRepo.aggregation(pipeline);
    if (search) return result.filter(word => word.word.includes((search as string).toLowerCase()));
    else return result;
}

export default {
    findOne,
    find,
    add,
    update,
    remove
}
import { FilterQuery, ProjectionFields, UpdateQuery } from "mongoose";
import userRepo from "./user.repo";
import { IUser } from "./user.types";
import { CustomPipeline } from "../../utility/generate.pipeline";
import { customQuery } from "../../utility/constants";

const add = async (user: IUser) => userRepo.create(user);

const update = (filter: FilterQuery<IUser>, data: UpdateQuery<IUser>) => userRepo.update(filter, data);

const findOne = (filter: FilterQuery<IUser>) => userRepo.findOne(filter);

const find = (query: customQuery) => {
    const pipeline = new CustomPipeline(query).generate();
    return userRepo.aggregation(pipeline);
}

export default{
    add,
    findOne,
    update,
    find
}
import { FilterQuery, PipelineStage, ProjectionFields, UpdateQuery } from "mongoose";
import { userModel } from "./user.schema";
import { IUser } from "./user.types";

const create = (user: IUser) => userModel.create(user);
const findOne = (filter: FilterQuery<IUser>) => userModel.findOne(filter);

const update = (filter: FilterQuery<IUser>, data: UpdateQuery<IUser>) => userModel.updateMany(filter, data); 

const aggregation = (pipeline: PipelineStage[]) => userModel.aggregate(pipeline);


export default{
    create,
    update,
    findOne,
    aggregation
}
import { FilterQuery } from "mongoose";
import { ILevel } from "./level.types";
import { levelModel } from "./level.schema";

const findOne = (filter: FilterQuery<ILevel>) => levelModel.findOne({isDeleted: false, ...filter});
const add = (level: ILevel) => levelModel.create(level);

export default {
    findOne,
    add
}
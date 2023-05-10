import { FilterQuery } from "mongoose";
import { ILevel } from "./level.types";
import levelRepo from "./level.repo";

const findOne = (filter: FilterQuery<ILevel>) => levelRepo.findOne(filter);

const add = async (level: ILevel) => {
    const oldLevel = await findOne({_id: level._id});
    if(!oldLevel) levelRepo.add(level);
}

export default {
    findOne,
    add
}
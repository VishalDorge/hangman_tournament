import { model } from "mongoose";
import { BaseSchema } from "../../utility/base.schema";
import { ICategory } from "./category.types";
import { levelModel } from "../level/level.schema";
import { statusModel } from "../status/status.schema";


const categorySchema = new BaseSchema({

    name: {
        type: String,
        unique: true,
        required: true
    }

})

export const categoryModel = model<Document & ICategory>("categories", categorySchema);

levelModel.findOne();
statusModel.findOne();
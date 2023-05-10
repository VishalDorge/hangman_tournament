import { Schema, model } from "mongoose";
import { BaseSchema } from "../../utility/base.schema";
import { WordType } from "./word.types";


const wordSchema = new BaseSchema({
    word: {
        type: String,
        required: true,
        unique: true
    },

    categories: {
        type: [Schema.Types.ObjectId],
        ref: "categories",
        unique: true,
        required: true
    },

    level: {
        type: Schema.Types.ObjectId,
        required: true
    }

});

export const wordModel = model<WordType>("words", wordSchema);
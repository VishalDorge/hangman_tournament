import { Document, model } from "mongoose";
import { BaseSchema } from "../../utility/base.schema";
import { ILevel } from "./level.types";

const levelSchema = new BaseSchema({

    name: {
        type: String,
        unique: true
    }

});

export const levelModel = model<Document & ILevel>("levels", levelSchema);
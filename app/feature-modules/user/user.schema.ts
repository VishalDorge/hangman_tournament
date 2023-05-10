import { Document, model } from "mongoose";
import { BaseSchema } from "../../utility/base.schema";
import { IUser } from "./user.types";
import { roleModel } from "../role/role.schema";

const userSchema = new BaseSchema({

    username: {
        type: String,
        unique: true,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String
    },

    isModerator: {
        type: Boolean,
        default: false
    },

    gameWon: {
        type: Number,
        default: 0
    }

})

export const userModel = model<Document & IUser>("users", userSchema);

roleModel.findOne();
import { Schema, model } from "mongoose";
import { BaseSchema } from "../../utility/base.schema";
import { CommentType } from "./comment.types";

const commentSchema = new BaseSchema({

    user: {
        type: Schema.Types.ObjectId,
        required: true
    },

    tournament: {
        type: Schema.Types.ObjectId,
        required: true
    },

    message: {
        type: String,
        required: true
    },

    isFlagged: {
        type: Boolean,
        default: false
    },

    type: {
        type: Number,
        default: 2
    }
    
})

export const commentModel = model<CommentType>("comments", commentSchema);
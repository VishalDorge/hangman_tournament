"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentModel = void 0;
const mongoose_1 = require("mongoose");
const base_schema_1 = require("../../utility/base.schema");
const commentSchema = new base_schema_1.BaseSchema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true
    },
    tournament: {
        type: mongoose_1.Schema.Types.ObjectId,
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
});
exports.commentModel = (0, mongoose_1.model)("comments", commentSchema);

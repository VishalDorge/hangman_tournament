"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wordModel = void 0;
const mongoose_1 = require("mongoose");
const base_schema_1 = require("../../utility/base.schema");
const wordSchema = new base_schema_1.BaseSchema({
    word: {
        type: String,
        required: true,
        unique: true
    },
    categories: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: "categories",
        unique: true,
        required: true
    },
    level: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true
    }
});
exports.wordModel = (0, mongoose_1.model)("words", wordSchema);

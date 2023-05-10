"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tournamentModel = void 0;
const mongoose_1 = require("mongoose");
const base_schema_1 = require("../../utility/base.schema");
const constants_1 = require("../../utility/constants");
const tournamentSchema = new base_schema_1.BaseSchema({
    name: {
        type: String,
        required: true
    },
    creator: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true
    },
    categories: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: "categories"
    },
    level: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "levels"
    },
    startDate: {
        type: Date,
        default: new Date()
    },
    endDate: {
        type: Date,
        default: new Date().setDate(new Date().getDay() + 1)
    },
    isEnded: {
        type: Boolean,
        default: false
    },
    noOfWordsPerGame: {
        type: Number,
        default: 10
    },
    status: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "statuses",
        default: constants_1.statuses.PENDING
    },
    words: {
        type: [mongoose_1.Schema.Types.ObjectId],
        ref: "words",
        default: [],
        required: true
    },
    newWords: {
        type: [{
                word: String,
                categories: [String]
            }],
        default: []
    }
});
exports.tournamentModel = (0, mongoose_1.model)("tournaments", tournamentSchema);

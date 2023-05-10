import { Schema, model } from "mongoose";
import { BaseSchema } from "../../utility/base.schema";
import { statuses } from "../../utility/constants";

const tournamentSchema = new BaseSchema({

    name: {
        type: String,
        required: true
    },

    creator: {
        type: Schema.Types.ObjectId,
        required: true
    },

    categories: {
        type: [Schema.Types.ObjectId],
        ref: "categories"
    },

    level: {
        type: Schema.Types.ObjectId,
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

    noOfWordsPerGame : {
        type: Number,
        default: 10
    },

    status: {
        type: Schema.Types.ObjectId,
        ref: "statuses",
        default: statuses.PENDING
    },

    words: {
        type: [Schema.Types.ObjectId],
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

export const tournamentModel = model("tournaments", tournamentSchema);
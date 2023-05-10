"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.leaderboardModel = void 0;
const mongoose_1 = require("mongoose");
const base_schema_1 = require("../../utility/base.schema");
const leaderboardSchema = new base_schema_1.BaseSchema({
    tournament: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "tournaments",
        required: true
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    score: {
        type: Number,
        default: 0
    },
    time: {
        type: String,
        default: "00:00:00"
    }
});
exports.leaderboardModel = (0, mongoose_1.model)("leaderboards", leaderboardSchema);

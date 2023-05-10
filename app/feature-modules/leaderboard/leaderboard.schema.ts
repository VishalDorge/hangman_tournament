import { Schema, model } from "mongoose";
import { BaseSchema } from "../../utility/base.schema";
import { LeaderboardType } from "./leaderboard.types";

const leaderboardSchema = new BaseSchema({

    tournament: {
        type: Schema.Types.ObjectId,
        ref: "tournaments",
        required: true
    },

    user: {
        type: Schema.Types.ObjectId,
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

export const leaderboardModel = model<LeaderboardType>("leaderboards", leaderboardSchema);
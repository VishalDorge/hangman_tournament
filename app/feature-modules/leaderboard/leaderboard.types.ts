import { Document, Schema } from "mongoose";

export interface ILeaderboard {
    _id?: Schema.Types.ObjectId;
    tournament: string;
    user: string;
    score?: number;
    time?: string
}

export interface IPlayerData {
    tournament: string;
    score?: number;
    time?: string;
}

export type LeaderboardType = Document & ILeaderboard;
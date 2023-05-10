import { Document, Schema } from "mongoose";
import { INewWord, IWordsData } from "../word/word.types";

export interface ITournament {
    _id?: Schema.Types.ObjectId;
    name: string;
    creator: string;
    categories: string[];
    level: string;
    startDate?: Date;
    endDate?: Date;
    isEnded?: boolean;
    noOfWordsPerGame?: number;
    status?: string;
    words: string[];
    newWords: INewWord[];
    leaderboard?: string[];
}

export type TournamentType = Document & ITournament;
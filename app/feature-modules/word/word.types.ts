import { Document, Schema } from "mongoose";


export interface IWord {
    _id?: Schema.Types.ObjectId | string;
    word: string;
    categories: string[];
    level: string;
}

export interface IWordsData {
    words: string[],
    categories: string[];
    level: string;
}

export interface INewWord {
    word: string;
    categories: string[];
}

export type WordType = Document & IWord;
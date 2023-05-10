import { Schema } from "mongoose";

export interface ILevel {
    _id?: Schema.Types.ObjectId | string;
    name: string;
}
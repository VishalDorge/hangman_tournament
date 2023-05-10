import { Schema } from "mongoose";

export interface ICategory{
    _id?: Schema.Types.ObjectId;
    name: string;
}
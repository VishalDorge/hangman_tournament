import { Document, Schema } from "mongoose";

export interface INotification {
    _id?: Schema.Types.ObjectId;
    userId: string;
    message: string;
}

export type NotificationType = Document & INotification
import { Document, Schema } from "mongoose";

export interface IComment {
    _id?: Schema.Types.ObjectId;
    user: string;
    tournament: string;
    message: string;
    isFlagged?: boolean;
    type?: number;
}

export interface ICommentCredentials {
    tournament: string;
    message: string;
}

export interface ICommentData {
    commentId: string;
    message?: string;
    isFlagged?: boolean;
}

export type CommentType = Document & IComment;
import { NextFunction, Request, Response } from "express";
import { roles } from "../constants";
import userServices from "../../feature-modules/user/user.services";
import commentServices from "../../feature-modules/comments/comment.services";
import { commentResponses } from "../../feature-modules/comments/comment.responses";

export const creatorAuthorization = async (req: Request, res: Response, next: NextFunction) => {
    const { id, role } = res.locals.payload;
    if (role === roles.ADMIN) return next();
    req.query = { ...req.query, creator: id };
    return next();
}

export const commentAuthorization = async (req: Request, res: Response, next: NextFunction) => {
    const { id, role } = res.locals.payload;
    const { commentData } = req.body;
    if (role === roles.ADMIN) return next();

    const comment = await commentServices.findOne({ _id: commentData.commentId });

    if (!comment) throw commentResponses.UNABLE_TO_PROCEED;
    const user = await userServices.findOne({ _id: id });

    if (comment.user == id) {
        const { commentId, message, ...restCommentData } = commentData;
        req.body.commentData = { commentId, message };
        return next();
    }
    else if (user?.isModerator) {
        const { commentId, isFlagged, ...restCommentData } = commentData;
        req.body.commendData = { commentId, isFlagged };
        return next();
    }
    else return next({ statusCode: 403, message: "FORBIDDEN!!!" })
}
import { FilterQuery, UpdateQuery } from "mongoose";
import commentRepo from "./comment.repo";
import { IComment, ICommentCredentials, ICommentData } from "./comment.types";
import { CustomPipeline } from "../../utility/generate.pipeline";
import tournamentServices from "../tournament/tournament.services";
import { Admins, customQuery, roles, statuses } from "../../utility/constants";
import { commentResponses } from "./comment.responses";
import userServices from "../user/user.services";
import notificationServices from "../notification/notification.services";
import { notificationTypes } from "../notification/notification.data";

const add = async (user: string, commentCredentials: ICommentCredentials) => {
    const tournament = await tournamentServices.findOne({ _id: commentCredentials.tournament, status: { $ne: statuses.REJECTED } });
    if (!tournament) throw commentResponses.UNABLE_TO_PROCEED;

    const type = tournament?.status == statuses.APPROVED ? 1 : 2;
    const comment = { user, ...commentCredentials, type }

    if (type === 2) {
        user === Admins.ADMIN ?
            await notificationServices.add(tournament.creator, notificationTypes.PRIVATE_MESSAGE_TO_USER, commentCredentials.tournament) :

            await notificationServices.add(Admins.ADMIN, notificationTypes.PRIVATE_MESSAGE_TO_ADMIN, commentCredentials.tournament);
    }
    else {
        await notificationServices.add(tournament.creator, notificationTypes.PUBLIC_COMMENT, commentCredentials.tournament, user);
    }

    return commentRepo.create(comment);
}

const findOne = (filter: FilterQuery<IComment>) => commentRepo.findOne(filter);

const update = async (filter: FilterQuery<IComment>, data: UpdateQuery<IComment>) => {
    const result = await commentRepo.update(filter, data);
    if (result.modifiedCount <= 0) throw commentResponses.UNABLE_TO_PROCEED;
    else return commentResponses.UPDATE_SUCCESS;
}

const updateComment = async (commentData: ICommentData) => {
    const { commentId, ...restCommentData } = commentData;
    return await update({ _id: commentId }, restCommentData);
}

const remove = async (userId: string, commentId: string) => {
    const user = await userServices.findOne({ _id: userId });
    const comment = await findOne({ _id: commentId });

    if (user?.role == roles.ADMIN || comment?.user == userId) {
        const result = await commentRepo.update({ _id: commentId }, { isDeleted: true });
        if (result.modifiedCount > 0) return commentResponses.DELETE_SUCCESS;
    }

    throw commentResponses.UNABLE_TO_PROCEED;
}

const find = (query: customQuery) => {
    const pipeline = new CustomPipeline(query).generate();
    return commentRepo.aggregation(pipeline);
}

export default {
    add,
    findOne,
    update,
    updateComment,
    remove,
    find
}
import { FilterQuery } from "mongoose";
import { INotification } from "./notification.types";
import notificationRepo from "./notification.repo";
import { notificationResponses } from "./notification.responses";
import { notificationTypes } from "./notification.data";
import commentServices from "../comments/comment.services";
import tournamentServices from "../tournament/tournament.services";
import userServices from "../user/user.services";

const findOne = (filter: FilterQuery<INotification>) => notificationRepo.findOne(filter);

const remove = async (filter: FilterQuery<INotification>) => {
    const result = await notificationRepo.update(filter, {isDeleted: true});
    if(result.modifiedCount <= 0) throw notificationResponses.UNABLE_TO_PROCEED;
    else return notificationResponses.DELETE_SUCCESS;
}

const messageBuilder = async (type: number, id: string, secondId: string = "") => {
    if(type === notificationTypes.COMMENT_FLAGGED){
        const comment = await commentServices.findOne({_id: id, isFlagged: true});
        const tournament = await tournamentServices.findOne({_id: comment?.tournament});
        return `Your Comment on Tournament ${tournament?.name} has Been Flagged`;
    }else if(type === notificationTypes.GAME_WON){
        const tournament = await tournamentServices.findOne({_id: id});
        return `You score a Top Rank in Tournament ${tournament?.name}`; 
    }else if(type === notificationTypes.TOURNAMENT_APPROVED) {
        const tournament = await tournamentServices.findOne({_id: id});
        return `Your tournament : ${tournament?.name} is Approved`;
    }else if(type === notificationTypes.TOURNAMENT_REJECTED) {
        const tournament = await tournamentServices.findOne({_id: id});
        return `Your tournament : ${tournament?.name} is Rejected`;
    }else if(type === notificationTypes.TOURNAMENT_SUBMITED_PLAYER) {
        return `Your tournament : ${id} is Submitted for Review`;
    }else if(type === notificationTypes.TOURNAMENT_SUBMITED_ADMIN) {
        return `New Tournament : ${id} has been Submitted for Review`;
    }else if(type === notificationTypes.TOURNAMENT_JOINED) {
        const tournament = await tournamentServices.findOne({_id: id});
        return `You Successfully joined to ${tournament?.name} Tournament.`;
    }else if(type === notificationTypes.SCORE_SUBMITTED) {
        const tournament = await tournamentServices.findOne({_id: id});
        return `Your Score has been Submitted in ${tournament?.name}`;
    } else if(type === notificationTypes.PRIVATE_MESSAGE_TO_USER) {
        const tournament = await tournamentServices.findOne({_id: id});
        return `Admin Responded to your Tournament : ${tournament?.name}`;
    } else if(type === notificationTypes.PRIVATE_MESSAGE_TO_ADMIN) {
        const tournament = await tournamentServices.findOne({_id: id});
        const user = await userServices.findOne({_id: tournament?.creator});
        return `${user?.username} replied to your Feedback on Tournament ${tournament?.name}`;
    } else if(type === notificationTypes.PUBLIC_COMMENT ) {
        const tournament = await tournamentServices.findOne({_id: id});
        const user = await userServices.findOne({_id: secondId});
        return `${user?.username} posted a new comment on your Tournament ${tournament?.name}`;
    }
    
    else throw notificationResponses.UNABLE_TO_PROCEED;
}

const add = async (userId: string, type: number, id: string, secondId: string = "") => {
    const notification = {userId, message: await messageBuilder(type, id, secondId)}
    return notificationRepo.create(notification);
}

export default {
    findOne,
    add,
    remove,
}
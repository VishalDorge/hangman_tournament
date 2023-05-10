import { FilterQuery, UpdateQuery } from "mongoose";
import { ITournament } from "./tournament.types";
import tournamentRepo from "./tournament.repo";
import { tournamentResponses } from "./tournament.responses";
import { CustomPipeline } from "../../utility/generate.pipeline";
import wordServices from "../word/word.services";
import { Admins, adminData, customQuery, statuses } from "../../utility/constants";
import notificationServices from "../notification/notification.services";
import { notificationTypes } from "../notification/notification.data";
import categoryServices from "../category/category.services";

const findOne = (filter: FilterQuery<ITournament>) => tournamentRepo.findOne(filter);

const add = async (tournamentCredentials: ITournament, creator: string) => {

    const oldTournament = await findOne({
        name: tournamentCredentials.name,
        creator,
        isEnded: false
    });

    console.log(oldTournament);
    if (oldTournament) throw tournamentResponses.UNABLE_TO_PROCEED;

    for (let category of tournamentCredentials.categories) {
        const isCategoryExist = await categoryServices.findOne({ _id: category });
        if (!isCategoryExist) throw tournamentResponses.UNABLE_TO_PROCEED;
    }

    await notificationServices.add(creator, notificationTypes.TOURNAMENT_SUBMITED_PLAYER, tournamentCredentials.name);

    await notificationServices.add(Admins.ADMIN, notificationTypes.TOURNAMENT_SUBMITED_ADMIN, tournamentCredentials.name);

    const tournament = { ...tournamentCredentials, creator };
    return tournamentRepo.create(tournament);
}

const update = async (filter: FilterQuery<ITournament>, data: UpdateQuery<ITournament>) => {
    const result = await tournamentRepo.update(filter, data);
    if (result.modifiedCount <= 0) throw tournamentResponses.UNABLE_TO_PROCEED;
    else return tournamentResponses.UPDATE_SUCCESS;
}

const updateStatus = async (tournamentId: string, status: number) => {

    const tournament = await findOne({ _id: tournamentId, status: statuses.PENDING });
    if (!tournament) throw tournamentResponses.UNABLE_TO_PROCEED;

    if (status === 0) {
        const result = await tournamentRepo.update(
            { _id: tournamentId },
            { $set: { status: statuses.REJECTED } }
        );

        await notificationServices.add(tournament?.creator, notificationTypes.TOURNAMENT_REJECTED, tournamentId);

        if (result.modifiedCount <= 0) throw tournamentResponses.UNABLE_TO_PROCEED;
        else return tournamentResponses.APPROVE_SUCCESS;
    }

    const wordIds: string[] = [];

    for (let wordObj of tournament.newWords) {

        const word: string = wordObj.word;
        const categories: string[] = wordObj.categories;

        const areAllCategoriesPresent = categories.every(category => tournament.categories.includes(category));

        if (!areAllCategoriesPresent) continue;

        const newWord = await wordServices.add({ words: [word], categories, level: tournament.level });

        if (newWord.successArray.length > 0) wordIds.push(newWord.successArray[0]._id as string);
    }

    const result = await tournamentRepo.update(
        { _id: tournamentId },
        { $set: { status: statuses.APPROVED, newWords: [] }, $push: { words: wordIds } }
    );

    await notificationServices.add(tournament?.creator, notificationTypes.TOURNAMENT_APPROVED, tournamentId);

    if (result.modifiedCount <= 0) throw tournamentResponses.UNABLE_TO_PROCEED;
    else return tournamentResponses.APPROVE_SUCCESS;
}

const remove = async (filter: FilterQuery<ITournament>) => {
    const result = await tournamentRepo.update(filter, { isDeleted: true });
    if (result.modifiedCount <= 0) throw tournamentResponses.UNABLE_TO_PROCEED;
    else return tournamentResponses.DELETE_SUCCESS;
}

const find = (query: customQuery) => {
    const pipeline = new CustomPipeline(query).generate();
    return tournamentRepo.aggregation(pipeline);
}

const getPending = (query: customQuery) => find({ ...query, status: statuses.PENDING });
const getApproved = (query: customQuery) => find({ ...query, status: statuses.APPROVED });
const getRejected = (query: customQuery) => find({ ...query, status: statuses.REJECTED });

export default {
    findOne,
    add,
    update,
    updateStatus,
    remove,
    find,
    getPending,
    getApproved,
    getRejected
}
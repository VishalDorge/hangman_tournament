import { FilterQuery, PipelineStage, Types, UpdateQuery } from "mongoose";
import { ILeaderboard, IPlayerData } from "./leaderboard.types";
import leaderboardRepo from "./leaderboard.repo";
import { leaderboardResponses } from "./leaderboard.responses";
import tournamentServices from "../tournament/tournament.services";
import { statuses } from "../../utility/constants";
import { CustomPipeline } from "../../utility/generate.pipeline";
import notificationServices from "../notification/notification.services";
import { notificationTypes } from "../notification/notification.data";

const findOne = (filter: FilterQuery<ILeaderboard>) => leaderboardRepo.findOne(filter);

const add = async (playerId: string, tournamentId: string) => {

    const tournament = await tournamentServices.findOne({
        _id: tournamentId,
        status: statuses.APPROVED,
        isEnded: false,
        creator: { $ne: playerId }
    });

    const oldLeaderboardEntry = await findOne({
        user: playerId,
        tournament: tournamentId
    });

    if (!tournament || oldLeaderboardEntry) throw leaderboardResponses.UNABLE_TO_PROCEED;

    const leaderboard = { user: playerId, tournament: tournamentId };

    await notificationServices.add(playerId, notificationTypes.TOURNAMENT_JOINED, tournamentId)

    return leaderboardRepo.create(leaderboard);
}

const updatePlayerData = async (playerId: string, playerData: IPlayerData) => {

    const tournament = await tournamentServices.findOne({
        _id: playerData.tournament,
        status: statuses.APPROVED,
        isEnded: false,
        creator: { $ne: playerId }
    });

    if (!tournament) throw leaderboardResponses.UNABLE_TO_PROCEED;
    let leaderboardEntry;

    const oldLeaderboardEntry = await findOne({ user: playerId, tournament: playerData.tournament });

    if (!oldLeaderboardEntry) {
        leaderboardEntry = await add(playerId, playerData.tournament);
    } else {
        if (oldLeaderboardEntry?.time !== "00:00:00" && oldLeaderboardEntry.score !== 0) throw leaderboardResponses.UNABLE_TO_PROCEED;
        leaderboardEntry = oldLeaderboardEntry;
    }

    await notificationServices.add(playerId, notificationTypes.SCORE_SUBMITTED, playerData.tournament);

    return update(
        { _id: leaderboardEntry },
        {
            $set: {
                score: playerData.score,
                time: playerData.time
            }
        }
    )
}

const update = async (filter: FilterQuery<ILeaderboard>, data: UpdateQuery<ILeaderboard>) => {
    const result = await leaderboardRepo.update(filter, data);
    if (result.modifiedCount <= 0) throw leaderboardResponses.UNABLE_TO_PROCEED;
    else return leaderboardResponses.UPDATE_SUCCESS;
}

const find = (query: any) => {
    const pipeline = new CustomPipeline(query).sortStage("score", "desc").generate();
    return leaderboardRepo.aggregation(pipeline);
}

export default {
    findOne,
    find,
    add,
    update,
    updatePlayerData
}
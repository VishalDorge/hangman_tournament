import { NextFunction, Request, Response, Router } from "express";
import leaderboardServices from "./leaderboard.services";
import { ResponseHandler } from "../../utility/response.handler";

const router = Router();

router.get("/:tournamentId", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {tournamentId} = req.params;
        const result = await leaderboardServices.find({tournament: tournamentId});
        res.send(new ResponseHandler(result));
    } catch (err) {
        next(err);
    }
})

router.post("/:tournamentId", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {tournamentId} = req.params;
        const playerId = res.locals.payload.id;
        const result = await leaderboardServices.add(playerId, tournamentId);
        res.send(new ResponseHandler(result));
    } catch (err) {
        next(err);
    }
})

router.patch("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const playerData = req.body;
        const playerId = res.locals.payload.id;
        const result = await leaderboardServices.updatePlayerData(playerId, playerData);
        res.send(new ResponseHandler(result));
    } catch (err) {
        next(err);
    }
})

export default router;
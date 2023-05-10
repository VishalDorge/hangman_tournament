import { NextFunction, Request, Response, Router } from "express";
import tournamentServices from "./tournament.services";
import { ResponseHandler } from "../../utility/response.handler";
import { creatorAuthorization } from "../../utility/middleware/authorize.validate";
import { roleValidator } from "../../utility/middleware/role.validate";
import { roles } from "../../utility/constants";

const router = Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const query = req.query;
        const result = await tournamentServices.find(query);
        res.send(new ResponseHandler(result));
    } catch (err) {
        next(err);
    }
})

router.get("/pending", creatorAuthorization, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const query = req.query;
        const result = await tournamentServices.getPending(query);
        res.send(new ResponseHandler(result));
    } catch (err) {
        next(err);
    }
})

router.get("/approved", creatorAuthorization, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const query = req.query;
        const result = await tournamentServices.getApproved(query);
        res.send(new ResponseHandler(result));
    } catch (err) {
        next(err);
    }
})

router.get("/rejected", creatorAuthorization, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const query = req.query;
        const result = await tournamentServices.getRejected(query);
        res.send(new ResponseHandler(result));
    } catch (err) {
        next(err);
    }
})

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tournament = req.body;
        const creatorId = res.locals.payload.id;
        const result = await tournamentServices.add(tournament, creatorId);
        res.send(new ResponseHandler(result));
    } catch (err) {
        next(err);
    }
})

router.patch("/approve", roleValidator([roles.ADMIN]), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {tournamentId, status} = req.body;
        const result = await tournamentServices.updateStatus(tournamentId, status);
        res.send(new ResponseHandler(result));
    } catch (err) {
        next(err);
    }
})

router.delete("/", (req: Request, res: Response, next: NextFunction) => {
    try {
        
    } catch (err) {
        next(err);
    }
})

export default router;
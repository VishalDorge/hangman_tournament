import { NextFunction, Request, Response, Router } from "express";
import { ResponseHandler } from "../../utility/response.handler";
import userServices from "./user.services";
import { PARAM_ID_VALIDATOR } from "../../utility/middleware/input.validate";

const router = Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const query = req.query;
        const result = await userServices.find(query);
        res.send(new ResponseHandler(result));
    } catch (err) {
        next(err);
    }
})

router.patch("/", (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.id;
    } catch (err) {
        next(err);
    }
})

router.patch("/make-moderator/:id", PARAM_ID_VALIDATOR, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.id;
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
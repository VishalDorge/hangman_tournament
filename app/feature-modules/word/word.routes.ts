import { NextFunction, Request, Response, Router } from "express";
import wordServices from "./word.services";
import { ResponseHandler } from "../../utility/response.handler";

const router = Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const query = req.query;
        const result = await wordServices.find(query);
        res.send(new ResponseHandler(result));
    } catch (err) {
        next(err);
    }
})

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const wordsData = req.body;
        const result = await wordServices.add(wordsData);
        res.send(new ResponseHandler(result));
    } catch (err) {
        next(err);
    }
})

router.patch("/", (req: Request, res: Response, next: NextFunction) => {
    try {
        
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
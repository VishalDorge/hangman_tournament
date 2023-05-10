import { NextFunction, Request, Response, Router } from "express";
import commentServices from "./comment.services";
import { ResponseHandler } from "../../utility/response.handler";
import { commentAuthorization } from "../../utility/middleware/authorize.validate";

const router = Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const query = req.query;
        const result = await commentServices.find(query);
        res.send(new ResponseHandler(result));
    } catch (err) {
        next(err);
    }
})

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const commendData = req.body;
        const userId = res.locals.payload.id;
        const result = await commentServices.add(userId, commendData);
        res.send(new ResponseHandler(result));
    } catch (err) {
        next(err);
    }
})

router.patch("/", commentAuthorization, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {commentData} = req.body;
        const result = await commentServices.updateComment(commentData);
        res.send(new ResponseHandler(result));
    } catch (err) {
        next(err);
    }
})

router.delete("/:commentId", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = res.locals.payload.id;
        const {commentId} = req.params;
        const result = await commentServices.remove(userId, commentId);
        res.send(new ResponseHandler(result));
    } catch (err) {
        next(err);
    }
})

export default router;
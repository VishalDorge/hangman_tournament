import { NextFunction, Request, Response, Router } from "express";

const router = Router();

router.get("/", (req: Request, res: Response, next: NextFunction) => {
    try {
        
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
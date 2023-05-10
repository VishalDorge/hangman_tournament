import { Router, Request, Response, NextFunction } from "express";
import { IUser } from "../user/user.types";
import authServices from "./auth.services";
import { ResponseHandler } from "../../utility/response.handler";
import { CREATE_USER_VALIDATION, GENERATE_TOKEN_VALIDATION, LOGIN_VALIDATION } from "./auth.validate";
import { roleValidator } from "../../utility/middleware/role.validate";
import { roles } from "../../utility/constants";

const router = Router();

router.post("/register-admin", roleValidator([roles.ADMIN]), CREATE_USER_VALIDATION,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = req.body;
            const result = await authServices.createAdmin(user);
            res.send(new ResponseHandler(result));
        } catch (err) {
            next(err)
        }
    })

router.post("/register-player", CREATE_USER_VALIDATION,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = req.body;
            const result = await authServices.createPlayer(user);
            res.send(new ResponseHandler(result));
        } catch (err) {
            next(err)
        }
    })

router.post("/login", LOGIN_VALIDATION, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const credentials = req.body;
        const result = await authServices.login(credentials);
        res.send(new ResponseHandler(result));
    } catch (err) {
        next(err);
    }
})

router.post("/token", GENERATE_TOKEN_VALIDATION,
    (req: Request, res: Response, next: NextFunction) => {
        try {
            const { refreshToken } = req.body;
            const result = authServices.generateAccessToken(refreshToken);
            res.send(new ResponseHandler(result));
        } catch (err) {
            next(err);
        }
    })

export default router;
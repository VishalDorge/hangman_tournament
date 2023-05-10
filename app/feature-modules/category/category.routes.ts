import { NextFunction, Request, Response, Router } from "express";
import categoryServices from "./category.services";
import { ResponseHandler } from "../../utility/response.handler";
import { CREATE_CATEGORY_VALIDATION, UPDATE_CATEGORY_VALIDATION } from "./category.validate";
import { roleValidator } from "../../utility/middleware/role.validate";
import { roles } from "../../utility/constants";
import { PARAM_ID_VALIDATOR } from "../../utility/middleware/input.validate";

const router = Router();

router.get("/", roleValidator([roles.ADMIN, roles.PLAYER]), async (req: Request, res: Response, next: NextFunction) => {
    try {
        const query = req.query;
        const result = await categoryServices.find(query);
        res.send(new ResponseHandler(result));
    } catch (err) {
        next(err);
    }
})

router.post("/", roleValidator([roles.ADMIN]), CREATE_CATEGORY_VALIDATION,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const category = req.body;
            const result = await categoryServices.add(category);
            res.send(new ResponseHandler(result));
        } catch (err) {
            next(err);
        }
    })

router.patch("/", roleValidator([roles.ADMIN]), UPDATE_CATEGORY_VALIDATION,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { categoryId, name } = req.body;
            const result = await categoryServices.update({ _id: categoryId }, { name });
            res.send(new ResponseHandler(result));
        } catch (err) {
            next(err);
        }
    })

router.delete("/:id", roleValidator([roles.ADMIN]), PARAM_ID_VALIDATOR,
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const categoryId = req.params.id;
        } catch (err) {
            next(err);
        }
    })

export default router;
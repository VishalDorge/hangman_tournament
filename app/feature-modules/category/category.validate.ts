import { body } from "express-validator";
import { inputValidator } from "../../utility/middleware/input.validate";

export const CREATE_CATEGORY_VALIDATION = [
    body("name").isString().isLength({min: 1}).withMessage("Category Name Required!"),
    inputValidator
]

export const UPDATE_CATEGORY_VALIDATION = [
    body("cateogoryId").isMongoId().withMessage("Valid CategoryId Required!"),
    body("name").isString().isLength({min: 1}).withMessage("Category Name Required!"),
    inputValidator
]
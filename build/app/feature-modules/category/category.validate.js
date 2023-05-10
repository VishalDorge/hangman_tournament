"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UPDATE_CATEGORY_VALIDATION = exports.CREATE_CATEGORY_VALIDATION = void 0;
const express_validator_1 = require("express-validator");
const input_validate_1 = require("../../utility/middleware/input.validate");
exports.CREATE_CATEGORY_VALIDATION = [
    (0, express_validator_1.body)("name").isString().isLength({ min: 1 }).withMessage("Category Name Required!"),
    input_validate_1.inputValidator
];
exports.UPDATE_CATEGORY_VALIDATION = [
    (0, express_validator_1.body)("cateogoryId").isMongoId().withMessage("Valid CategoryId Required!"),
    (0, express_validator_1.body)("name").isString().isLength({ min: 1 }).withMessage("Category Name Required!"),
    input_validate_1.inputValidator
];

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_services_1 = __importDefault(require("./category.services"));
const response_handler_1 = require("../../utility/response.handler");
const category_validate_1 = require("./category.validate");
const role_validate_1 = require("../../utility/middleware/role.validate");
const constants_1 = require("../../utility/constants");
const input_validate_1 = require("../../utility/middleware/input.validate");
const router = (0, express_1.Router)();
router.get("/", (0, role_validate_1.roleValidator)([constants_1.roles.ADMIN, constants_1.roles.PLAYER]), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query;
        const result = yield category_services_1.default.find(query);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (err) {
        next(err);
    }
}));
router.post("/", (0, role_validate_1.roleValidator)([constants_1.roles.ADMIN]), category_validate_1.CREATE_CATEGORY_VALIDATION, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = req.body;
        const result = yield category_services_1.default.add(category);
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (err) {
        next(err);
    }
}));
router.patch("/", (0, role_validate_1.roleValidator)([constants_1.roles.ADMIN]), category_validate_1.UPDATE_CATEGORY_VALIDATION, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { categoryId, name } = req.body;
        const result = yield category_services_1.default.update({ _id: categoryId }, { name });
        res.send(new response_handler_1.ResponseHandler(result));
    }
    catch (err) {
        next(err);
    }
}));
router.delete("/:id", (0, role_validate_1.roleValidator)([constants_1.roles.ADMIN]), input_validate_1.PARAM_ID_VALIDATOR, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categoryId = req.params.id;
    }
    catch (err) {
        next(err);
    }
}));
exports.default = router;

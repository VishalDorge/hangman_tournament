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
const category_repo_1 = __importDefault(require("./category.repo"));
const category_responses_1 = require("./category.responses");
const generate_pipeline_1 = require("../../utility/generate.pipeline");
const findOne = (filter) => category_repo_1.default.findOne(filter);
const add = (category) => category_repo_1.default.create(category);
const update = (filter, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_repo_1.default.update(filter, data);
    if (result.modifiedCount <= 0)
        throw category_responses_1.categoryResponses.UNABLE_TO_PROCEED;
    return category_responses_1.categoryResponses.UPDATE_SUCCESS;
});
const remove = (filter) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_repo_1.default.update(filter, { isDeleted: true });
    if (result.modifiedCount <= 0)
        throw category_responses_1.categoryResponses.UNABLE_TO_PROCEED;
    return category_responses_1.categoryResponses.DELETE_SUCCESS;
});
const find = (query) => {
    const pipeline = new generate_pipeline_1.CustomPipeline(query).generate();
    return category_repo_1.default.aggregation(pipeline);
};
exports.default = {
    findOne,
    find,
    add,
    update,
    remove
};

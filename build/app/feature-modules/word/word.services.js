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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const word_repo_1 = __importDefault(require("./word.repo"));
const word_responses_1 = require("./word.responses");
const generate_pipeline_1 = require("../../utility/generate.pipeline");
const findOne = (filter) => word_repo_1.default.findOne(filter);
const add = (wordsData) => __awaiter(void 0, void 0, void 0, function* () {
    const { categories, level, words } = wordsData;
    const successArray = [];
    const failureArray = [];
    for (let word of words) {
        try {
            const result = yield word_repo_1.default.create({ word, categories, level });
            successArray.push(result);
        }
        catch (err) {
            failureArray.push(word);
        }
    }
    return { successArray, failureArray };
});
const update = (filter, data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield word_repo_1.default.update(filter, data);
    if (result.modifiedCount <= 0)
        throw word_responses_1.wordResponses.UNABLE_TO_PROCEED;
    else
        return word_responses_1.wordResponses.UPDATE_SUCCESS;
});
const remove = (filter) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield word_repo_1.default.update(filter, { isDeleted: true });
    if (result.modifiedCount <= 0)
        throw word_responses_1.wordResponses.UNABLE_TO_PROCEED;
    else
        return word_responses_1.wordResponses.DELETE_SUCCESS;
});
const find = (queryData) => __awaiter(void 0, void 0, void 0, function* () {
    const { search } = queryData, query = __rest(queryData, ["search"]);
    const pipeline = new generate_pipeline_1.CustomPipeline(query).unWindStage("categories").generate();
    const result = yield word_repo_1.default.aggregation(pipeline);
    if (search)
        return result.filter(word => word.word.includes(search.toLowerCase()));
    else
        return result;
});
exports.default = {
    findOne,
    find,
    add,
    update,
    remove
};

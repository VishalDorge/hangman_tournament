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
const user_repo_1 = __importDefault(require("./user.repo"));
const generate_pipeline_1 = require("../../utility/generate.pipeline");
const add = (user) => __awaiter(void 0, void 0, void 0, function* () { return user_repo_1.default.create(user); });
const update = (filter, data) => user_repo_1.default.update(filter, data);
const findOne = (filter) => user_repo_1.default.findOne(filter);
const find = (query) => {
    const pipeline = new generate_pipeline_1.CustomPipeline(query).generate();
    return user_repo_1.default.aggregation(pipeline);
};
exports.default = {
    add,
    findOne,
    update,
    find
};

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
const level_repo_1 = __importDefault(require("./level.repo"));
const findOne = (filter) => level_repo_1.default.findOne(filter);
const add = (level) => __awaiter(void 0, void 0, void 0, function* () {
    const oldLevel = yield findOne({ _id: level._id });
    if (!oldLevel)
        level_repo_1.default.add(level);
});
exports.default = {
    findOne,
    add
};

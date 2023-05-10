"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const level_schema_1 = require("./level.schema");
const findOne = (filter) => level_schema_1.levelModel.findOne(Object.assign({ isDeleted: false }, filter));
const add = (level) => level_schema_1.levelModel.create(level);
exports.default = {
    findOne,
    add
};

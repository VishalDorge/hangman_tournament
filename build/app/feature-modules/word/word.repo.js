"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const word_schema_1 = require("./word.schema");
const findOne = (filter) => word_schema_1.wordModel.findOne(Object.assign({ isDeleted: false }, filter));
const create = (word) => word_schema_1.wordModel.create(word);
const update = (filter, data) => word_schema_1.wordModel.updateMany(filter, data);
const aggregation = (pipeline) => word_schema_1.wordModel.aggregate(pipeline);
exports.default = {
    findOne,
    create,
    update,
    aggregation
};

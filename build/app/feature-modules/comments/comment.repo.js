"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const comment_schema_1 = require("./comment.schema");
const create = (comment) => comment_schema_1.commentModel.create(comment);
const findOne = (filter) => comment_schema_1.commentModel.findOne(Object.assign({ isDeleted: false }, filter));
const update = (filter, data) => {
    return comment_schema_1.commentModel.updateMany(Object.assign({ isDeleted: false }, filter), data);
};
const aggregation = (pipeline) => comment_schema_1.commentModel.aggregate(pipeline);
exports.default = {
    create,
    findOne,
    update,
    aggregation
};

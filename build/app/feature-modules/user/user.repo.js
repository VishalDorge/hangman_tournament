"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_schema_1 = require("./user.schema");
const create = (user) => user_schema_1.userModel.create(user);
const findOne = (filter) => user_schema_1.userModel.findOne(filter);
const update = (filter, data) => user_schema_1.userModel.updateMany(filter, data);
const aggregation = (pipeline) => user_schema_1.userModel.aggregate(pipeline);
exports.default = {
    create,
    update,
    findOne,
    aggregation
};

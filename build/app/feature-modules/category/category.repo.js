"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const category_schema_1 = require("./category.schema");
const findOne = (filter) => category_schema_1.categoryModel.findOne(Object.assign({ isDeleted: false }, filter));
const create = (category) => category_schema_1.categoryModel.create(category);
const update = (filter, data) => {
    return category_schema_1.categoryModel.updateMany(filter, data);
};
const aggregation = (pipeline) => category_schema_1.categoryModel.aggregate(pipeline);
exports.default = {
    findOne,
    create,
    update,
    aggregation
};

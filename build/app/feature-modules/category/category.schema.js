"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryModel = void 0;
const mongoose_1 = require("mongoose");
const base_schema_1 = require("../../utility/base.schema");
const level_schema_1 = require("../level/level.schema");
const status_schema_1 = require("../status/status.schema");
const categorySchema = new base_schema_1.BaseSchema({
    name: {
        type: String,
        unique: true,
        required: true
    }
});
exports.categoryModel = (0, mongoose_1.model)("categories", categorySchema);
level_schema_1.levelModel.findOne();
status_schema_1.statusModel.findOne();

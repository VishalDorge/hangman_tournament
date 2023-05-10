"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const mongoose_1 = require("mongoose");
const base_schema_1 = require("../../utility/base.schema");
const role_schema_1 = require("../role/role.schema");
const userSchema = new base_schema_1.BaseSchema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String
    },
    isModerator: {
        type: Boolean,
        default: false
    },
    gameWon: {
        type: Number,
        default: 0
    }
});
exports.userModel = (0, mongoose_1.model)("users", userSchema);
role_schema_1.roleModel.findOne();

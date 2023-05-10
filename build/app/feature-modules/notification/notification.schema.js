"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationModel = void 0;
const mongoose_1 = require("mongoose");
const base_schema_1 = require("../../utility/base.schema");
const notificationSchema = new base_schema_1.BaseSchema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true
    },
    message: {
        type: String,
        required: true
    }
});
exports.notificationModel = (0, mongoose_1.model)("notifications", notificationSchema);

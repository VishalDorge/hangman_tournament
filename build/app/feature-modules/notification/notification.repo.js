"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notification_schema_1 = require("./notification.schema");
const findOne = (filter) => notification_schema_1.notificationModel.findOne(Object.assign({ isDeleted: false }, filter));
const create = (notification) => notification_schema_1.notificationModel.create(notification);
const update = (filter, data) => {
    return notification_schema_1.notificationModel.updateMany(filter, data);
};
exports.default = {
    findOne,
    create,
    update
};

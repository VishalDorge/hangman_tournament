import { FilterQuery, UpdateQuery } from "mongoose";
import { INotification } from "./notification.types";
import { notificationModel } from "./notification.schema";


const findOne = (filter: FilterQuery<INotification>) => notificationModel.findOne({isDeleted: false, ...filter});

const create = (notification: INotification) => notificationModel.create(notification);

const update = (filter: FilterQuery<INotification>, data: UpdateQuery<INotification>) => {
    return notificationModel.updateMany(filter, data);
}

export default {
    findOne,
    create,
    update
}
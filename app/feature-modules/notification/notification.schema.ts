import { Schema, model } from "mongoose";
import { BaseSchema } from "../../utility/base.schema";
import { NotificationType } from "./notification.types";


const notificationSchema = new BaseSchema({

    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },

    message: {
        type: String,
        required: true
    }

})

export const notificationModel = model<NotificationType>("notifications", notificationSchema);
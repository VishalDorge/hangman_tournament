import { isValidObjectId } from "mongoose";

export const convertValuesToOriginalType = (object: any) => {
    Object.keys(object).forEach(key => {
        if(isValidObjectId(object[key])) object[key];
        else if(parseInt(object[key])) object[key] = parseInt(object[key]);
        else if(object[key] === "true" || object[key] === "false") object[key] = JSON.parse(object[key]); 
        else if(typeof object[key] === 'object') convertValuesToOriginalType(object[key]);
    })
}

export const timesInSeconds = (timeString: string) => {
    const [hours, minutes, seconds] = timeString.split(':');
    return (parseInt(hours) * 60 * 60) + (parseInt(minutes) * 60) + parseInt(seconds);
}
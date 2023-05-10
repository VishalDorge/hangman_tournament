import authServices from "../feature-modules/auth/auth.services";
import levelServices from "../feature-modules/level/level.services";
import roleServices from "../feature-modules/role/role.services";
import statusServices from "../feature-modules/status/status.services";
import { adminData, levelData, rolesData, statusesData } from "./constants";


export const populate = async () => {
    try {
        await authServices.createAdmin(adminData);
        statusesData.forEach(async status => await statusServices.add(status));
        rolesData.forEach(async role => await roleServices.add(role));
        levelData.forEach(async level => await levelServices.add(level));
    } catch (error) {
        console.log("Data is Already Populated...");
    }
}
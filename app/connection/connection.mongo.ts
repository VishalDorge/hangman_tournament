import { connect } from "mongoose";

export const connectToMongo = async () => {
    try {
        // const { mongo_connection_url } = process.env;
        await connect("mongodb+srv://vishaldorge:Vishal123@hangmantournament.f4mtlbj.mongodb.net/" || "");
        console.log("connected to mongoDB");
        return true;
    } catch (error) {
        console.log("Failed to Connect with MongoDB");
    }
}
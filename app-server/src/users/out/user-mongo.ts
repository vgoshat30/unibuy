import {BasicUser} from "../models/user";
import {MongoModel} from "../../mongo-connector/mongo-connector";

async function createUser(basicUser: BasicUser) {
    const newUser = new MongoModel.User({ email: basicUser.email, password: basicUser.password, name: basicUser.name, isSeller: false, isAdmin: false, createdAt: new Date(), updatedAt: new Date() });
    return await newUser.save();
}

export const UsersMongo = {createUser};

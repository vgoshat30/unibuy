import {BasicUser} from "./models/user";
import {Application} from "express";
import {UsersMongo} from "./out/user-mongo";

function init(app: Application) {
    app.post('/signup', signUp);
}
async function signUp(req, res) {
    let response;
    try {
        console.log(`Got request to sign up with ${JSON.stringify(req.body)}`);
        const basicUser: BasicUser = req.body;
        response = await UsersMongo.createUser(basicUser);
    } catch (error) {
        console.log(error);
        response = `Error sign up user`;
    }
    res.send(response);
}

export const UsersAPI = {init};

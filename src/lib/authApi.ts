import Utils from "./utils";
import Config from "../config";
import Const from "../lib/consts";
import express from "express";

const checkAdmin = async (req: express.Request, res: express.Response, next: express.NextFunction) => {

    try {

        const authString = req.header("Authorization") || "";

        const [basicKeyword, encodedStrng] = authString.split(" ");

        if (basicKeyword != "Basic")
            return Utils.errorResponse(res, Const.authorizationError.invalid);

        const decodedString = Buffer.from(encodedStrng || '', 'base64').toString('utf8');

        const [username, password] = decodedString.split(":");

        if (username != Config.admin.username || password != Config.admin.password)
            return Utils.errorResponse(res, Const.authorizationError.invalid);

        next();

    } catch (err) {
        console.error('error authorization:', err);
        Utils.errorResponse(res, 'Authorization error');
    }

}

export = checkAdmin;
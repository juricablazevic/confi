import Config from "../config";
import nodemailer from 'nodemailer';
import { Response } from 'express';

export = {
    generateCode: (length = 6) => {

        let code = "";
        const possible = "0123456789";

        for (let i = 0; i < length; i++)
            code += possible.charAt(Math.floor(Math.random() * possible.length));

        return code;

    },
    successResponse: (res: Response, data = {}) => {
        res.json({
            error: false,
            data
        })
    },
    errorResponse: (res: Response, msg = "") => {
        res.json({
            error: true,
            msg
        })
    },
    sendMail: async ({ to, subject, text }: { to: string, subject: string, text: string }) => {

        try {

            const transporter = nodemailer.createTransport({
                host: Config.email.host,
                port: Config.email.port,
                secure: Config.email.secure,
                auth: Config.email.auth
            });

            await transporter.sendMail({
                from: Config.email.from,
                to,
                subject,
                text
            });

            return Promise.resolve();

        } catch (err) {
            return Promise.reject(err);
        }

    }
}
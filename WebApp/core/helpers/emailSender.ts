import * as nodemailer from "nodemailer"

import BaseConfig from "./../config/baseConfig"

export class EmailSender {

    private smtpTransport = nodemailer.createTransport("SMTP", {
        service: "Gmail",
        auth: {
            user: BaseConfig.emailUsername,
            pass: BaseConfig.emailPassword
        }
    });
}
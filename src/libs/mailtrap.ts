import { MailtrapClient } from "mailtrap";
import nodemailer from "nodemailer";

export const sendEmail = async (to: string, subject: string, body: string) => {
    const transporter = nodemailer.createTransport({
        host: 'sandbox.smtp.mailtrap.io',
        port: 587,
        auth: {
            user: process.env.MAILTRAP_USER as string,
            pass: process.env.MAILTRAP_PASS as string,
        }
    });

    try {
        await transporter.sendEmail({
            from: '"Sistema" <sistema@email.com',
            to,
            subject,
            text: body,
        });
        return true;
    } catch (err) {
        console.error( 'Erro ao enviar e-mail:', err);
        return false
    }
};
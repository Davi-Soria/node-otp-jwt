import { RequestHandler } from "express";
import { authSignInSchema } from "../schemas/auth.signin";
import { getUserByEmail } from "../services/user";
import { generateOtp } from "../services/otp";
import { sendEmail } from "../libs/mailtrap";

export const signin: RequestHandler = async (req, res) => {
    // Validar os dados recebidos;
    const data = authSignInSchema.safeParse(req.body);
    if(!data.success) {
        res.json({ error: data.error.flatten().fieldErrors});
        return;
    }
    // Verificar se o usuário existe (baseado no email)
    const user = await getUserByEmail(data.data.email);
    if(!user) {
        res.json({ error: "Usuário não existe" });
        return
    }
    // Gerar um código OTP para este usuário
    const otp = await generateOtp(user.id);

    // Enviar um email para o usuário com o código
    await sendEmail('teste@teste.com', 'Assunto de teste', 'Corpo do email');

    // Devolve o ID do código OTP
    res.json({ id: otp.id });
}
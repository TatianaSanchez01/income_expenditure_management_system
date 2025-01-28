import nodemailer from 'nodemailer';
import { NextApiRequest, NextApiResponse } from 'next';

interface EmailRequestBody {
  email: string;
  name: string;
  password: string;
}

const sendEmail = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { email, name, password }: EmailRequestBody = req.body;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      port: 465,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const message = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Bienvenido a GastoControl',
      text: `Hola ${name}. Tu contraseña es ${password}`,
    };

    try {
      await transporter.sendMail(message);
      res.status(200).json({ success: true });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};

export default sendEmail;

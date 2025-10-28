// ---> sirve para enviar correos electrónicos usando nodemailer y Gmail
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail", // o 'hotmail', 'outlook', 'yahoo'
  auth: {
    user: process.env.EMAIL_USER, // definido en .env
    pass: process.env.EMAIL_PASS, // definido en .env
  },
});


async function enviarCorreo(destinatario, asunto, cuerpo) {
  try {
    const info = await transporter.sendMail({
      from: `"Servidor Node 👨‍💻" <${process.env.EMAIL_USER}>`,
      to: destinatario,
      subject: asunto,
      text: cuerpo,
      html: `<b>${cuerpo}</b>`,
    });

    console.log("Correo enviado:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    return { success: false, error };
  }
}

module.exports = {enviarCorreo};
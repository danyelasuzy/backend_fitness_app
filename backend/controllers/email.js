import nodemailer from "nodemailer";

export const sendEmail = async (options) => {
  //1) Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      password: process.env.EMAIL_PASSWORD,
    },
  });

  //2) Define the email options
  const mailOptions = {
    from: "The Solutions Squad <ezraart89@gmail.com>",
    to: options.mail,
    subject: options.subject,
    text: options.message,
  };

  //3) Send the email
  await transporter.sendMail(mailOptions);
};

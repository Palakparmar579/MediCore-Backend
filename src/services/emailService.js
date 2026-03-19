import transporter from "../config/mailConfig.js";

const sendEmail = async ({to, subject, html}) => {
  try {
    const info = await transporter.sendMail({
      from: `"MediCore" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html
    });
    return info;
  } catch (error) {
    throw new Error(error.message);
  }
};
export default sendEmail
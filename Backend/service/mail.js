const nodemailer = require('nodemailer');
require('dotenv').config();

const { SMTP_SERVICE, SMTP_USER, SMTP_PASSWORD } = process.env;

const transporter = nodemailer.createTransport({
  service: SMTP_SERVICE,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASSWORD,
  },
});

const sendActivationMail = async (to, link) => {
  await transporter.sendMail({
    from: SMTP_USER,
    to,
    subject: 'Активация аккаунта на Mindfulness',
    text: '',
    html: `
            <table border="0" cellspacing="0" cellpadding="0" align="center" >
              <tr>
                <td align="center" style="color:#313131; font:bold 18px Arial;">Для активации аккаунта нажмите на кнопку</td>
              </tr>
              <tr>
                <td align="center" height="20px"></td>
              </tr>
              <tr align="center">
                <td>
                  <span style="display: inline-block;">
                    <a style="border-width: 15px 35px 15px 35px; border-style: solid; border-color: #b5f2ea; display: inline-block; font-family: Arial; text-decoration: none; font-size: 14px; line-height: 1; font-weight: 700; color: #313131; background-color: #b5f2ea; border-top-left-radius: 48px; border-top-right-radius: 48px; border-bottom-left-radius: 48px; border-bottom-right-radius: 48px;" href=${link}>
                      Активировать
                    </a>
                  </span>
                </td>
              </tr>
            </table>
    `,
  });
};

const sendProof = async (to, link) => {
  await transporter.sendMail({
    from: SMTP_USER,
    to,
    subject: 'Подтверждение изменения данных на Mindfulness',
    text: '',
    html: `
            <table border="0" cellspacing="0" cellpadding="0" align="center" >
              <tr>
                <td align="center" style="color:#313131; font:bold 18px Arial;">Хотите изменить email или пароль?</td>
              </tr>
              <tr>
                <td align="center" height="20px"></td>
              </tr>
              <tr align="center">
                <td>
                  <span style="display: inline-block;">
                    <a style="border-width: 15px 35px 15px 35px; border-style: solid; border-color: #b5f2ea; display: inline-block; font-family: Arial; text-decoration: none; font-size: 14px; line-height: 1; font-weight: 700; color: #313131; background-color: #b5f2ea; border-top-left-radius: 48px; border-top-right-radius: 48px; border-bottom-left-radius: 48px; border-bottom-right-radius: 48px;" href=${link}>
                      Да
                    </a>
                  </span>
                </td>
              </tr>
            </table>
    `,
  });
};

module.exports = {
  sendActivationMail,
  sendProof,
};

const nodemailer = require("nodemailer");

exports.handler = async (event) => {
  const data = JSON.parse(event.body);

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"큐니아 문의" <${process.env.SMTP_USER}>`,
      to: "your@email.com", // 수신자 이메일
      subject: `[큐니아 문의] ${data.name}님의 메시지`,
      text: `보낸사람: ${data.name} <${data.email}>\n\n내용:\n${data.message}`,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "메일 전송 성공" }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
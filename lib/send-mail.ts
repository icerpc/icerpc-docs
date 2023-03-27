import * as AWS from 'aws-sdk';
import { Feedback } from 'components/Shell/Feedback/FeedbackForm';
import * as nodemailer from 'nodemailer';

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'ap-south-1'
});
AWS.config.getCredentials(function (error) {
  if (error) {
    console.log(error.stack);
  }
});

const ses = new AWS.SES({ apiVersion: 'latest' });

// Create a transporter of nodemailer
const transporter = nodemailer.createTransport({
  SES: ses
});

export const sendFeedbackMail = async (feedback: Feedback) => {
  const { email, option, path, additionalFeedback } = feedback;
  try {
    const response = await transporter.sendMail({
      from: email || 'icerpcdocs@zeroc.com',
      to: 'feedback@zeroc.com',
      subject: 'Feedback from IceRPC Docs',
      html: `
  <!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" "http://www.w3.org/TR/REC-html40/loose.dtd">
  <html>
  <head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  </head>
  <body>
  <div style="padding:20px;">
  <div style="max-width: 500px;">
  <h2>Test Mail</h2>
  <p>
  A user gave some feedback on the docs,<br/><br/>

  Page: ${path}<br/>
  Option: ${option}<br/>
  Email: ${email}<br/>
  Additional Feedback: ${additionalFeedback}<br/>
  </p>
  </div>
  </div>
  </body>
  </html>
  `
    });
    return response?.messageId
      ? { ok: true }
      : { ok: false, msg: 'Failed to send email' };
  } catch (e) {
    console.log(e);
  }
};

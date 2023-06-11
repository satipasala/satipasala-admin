import * as functions from 'firebase-functions';
import * as nodemailer from 'nodemailer'

/**
 * Send email
 *
 * @param {string} type - Email type for logging purpose
 * @param {string} recipientEmail - multiple address can be given seperated by comma (,)
 * @param {string} subject
 * @param {string} htmlContent
 * @returns {Promise}
 */
const sendEmail = function (recipientEmail: string, subject: string, htmlContent: string): Promise<any> {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.LOGIN_USERNAME,
      pass: process.env.LOGIN_PASSWORD,
    },
  });
  return transporter.sendMail({
    from: process.env.SENDER_EMAIL_ADDRESS,
    to: recipientEmail,
    subject: subject,
    html: htmlContent
  }).then(function (info) {
    console.log(info);
  }).catch(function (err) {
    console.log(err);
  });
};


/**
 * Send welcome email upon user creation
 *
 * @type {CloudFunction<Change<DocumentSnapshot>>}
 */
export const emailNewUser = functions.firestore.document('/users/{doc_id}').onCreate(
  (snap, context) => {
    const data = snap.data();
    const loginLink = functions.config().email.login_link;
    return sendEmail(data.email, `Welcome to Satipasala!`, `Dear user ,<br/>` +
      "Welcome to “Sati Pasala”! Your Satipasala account has been successfully created. Please use the following link to log in.<br/>" +
      `Login link : ${loginLink}<br/><br/>` +
      "<b>Let’s start your journey on mindfulness today.</b><br/><br/></br><br/>" +
      "<i>  Note: This is an automated email and you can’t reply to this address.<br/>" +
      "  You are receiving this email from Satipasala.org because this email address was used to create a user account.</i><br/><br/>" +
      "  Good Luck,<br/>" +
      "  Sati Pasala Team.<br/>")
      .then(() => console.log("Welcome email message is sent to %s", data.email))
      .catch(() => console.error("Welcome email message couldn't be sent to %s", data.email));
  }
);

/**
 * Send email upon host creation
 *
 * @type {CloudFunction<Change<DocumentSnapshot>>}
 */
export const emailNewHost = functions.firestore.document('/hosts/{doc_id}').onCreate(
  (snap, context) => {
    const data = snap.data();
    const loginLink = functions.config().email.login_link;
    return sendEmail(data.email, `New host - ${data.name} added to Satipasala!`, `Dear ${data.name}, <br/>` +
      `Host ${data.name} have been successfully created. Please use the following link to log in.<br/>` +
      `Login link : ${loginLink}<br/><br/><br/>` +
      "<i>  Note: This is an automated email and you can’t reply to this email address.<br/>" +
      "  You are receiving this email from Satipasala.org because this email address was used to create a new host.</i><br/><br/>" +
      "  Best Regards,<br/>" +
      "  Satipasala Team.")
      .then(() => console.log("New host email message is sent to %s", data.email))
      .catch(() => console.error("New host email message couldn't be sent to %s", data.email));
  }
);


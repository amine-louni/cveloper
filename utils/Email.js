const nodeMailer = require('nodemailer');
const neh = require('nodemailer-express-handlebars');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.firstName;
    this.url = url;
    this.from = `${process.env.EMAIL_FROM}`;
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      // Sending real email
      return nodeMailer.createTransport({
        service: 'SendGrid',
        auth: {
          user: process.env.SENDGRID_USERNAME,
          pass: process.env.SENDGRID_PASSWORD,
        },
      });
    }
    // 1) Create a transporter
    return nodeMailer.createTransport({
      host: process.env.MAILTRAP_EMAIL_HOST,
      port: process.env.MAILTRAP_EMAIL_PORT,
      auth: {
        user: process.env.MAILTRAP_EMAIL_USERNAME,
        pass: process.env.MAILTRAP_EMAIL_PASSWORD,
      },
    });
  }

  async send(template, subject) {
    // Send the actual email
    // 1 )  Render the HTML based on Handlebar template

    // 2 )  Define ehe Email Options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      template,
      context: {
        firstName: this.firstName,
        url: this.url,
        subject,
      },
      // text: htmlToText.fromString(html),
    };
    // 2 )  Create a transport and send email
    await this.newTransport()
      .use(
        'compile',
        neh({
          viewEngine: {
            defaultLayout: null,
          },
          viewPath: `${__dirname}/../templates/emails/`,
          extName: '.hbs',
        })
      )
      .sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('welcome', 'Thank you for joining us');
  }

  async sendPasswordReset() {
    await this.send(
      'password-reset',
      'Valid only for 10 min',
      'Click the link below to reset you password'
    );
  }

  async sendValidationEmail() {
    await this.send(
      'email-validation',
      'Confirm your email -valid only for 10 min-'
    );
  }
};

const { UserModel } = require('../model');

// const sgMail = require('@sendgrid/mail');
// sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// const SENDER = process.env.SENDGRID_SENDER;

const nodemailer = require('nodemailer');

const config = {
  host: 'smtp.meta.ua',
  port: 465,
  secure: true,
  auth: {
    user: process.env.META_USER,
    pass: process.env.META_PASSWORD,
  },
};

const transporter = nodemailer.createTransport(config);

const authConfirmation = async (req, res) => {
  const { verificationToken } = req.params;

  try {
    const user = await UserModel.findOneAndUpdate(
      { verificationToken },
      {
        $set: { verify: true, verificationToken: null },
      }
    );

    // const msg = {
    //   to: user.email, // Change to your recipient
    //   from: SENDER, // Change to your verified sender
    //   subject: 'Email confirmation',
    //   text: `Verification successful for email ${user.email}`,
    //   html: `<strong>Verification successful for email ${user.email}</strong>`,
    // };

    const message = {
      from: process.env.META_USER,
      to: user.email,
      subject: 'Email confirmation',
      text: `Verification successful for email ${user.email}`,
      html: `<strong>Verification successful for email ${user.email}</strong>`,
    };

    if (!user) {
      return res.status(404).json({
        status: 'Not Found',
        message: 'User not found',
      });
    }

    // await sgMail.send(msg);

    await transporter.sendMail(message);

    res.status(200).json({
      Status: 200,
      message: 'Verification successful',
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = authConfirmation;

const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

exports.saveContact = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Save to Database
        const newContact = new Contact({ name, email, message });
        await newContact.save();

        // Email Notification
        const transporter = nodemailer.createTransport({
            service: process.env.EMAIL_SERVICE || 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_RECEIVER || process.env.EMAIL_USER,
            subject: `New Contact Message from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
        };

        // Note: In a production environment, you might want to handle email async
        // or using a queue to avoid blocking the response.
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            await transporter.sendMail(mailOptions);
            console.log('Email sent successfully');
        } else {
            console.warn('Email credentials not set. Skipping email notification.');
        }

        res.status(201).json({ message: 'Contact message saved successfully' });
    } catch (err) {
        console.error('Error in saveContact:', err);
        res.status(400).json({ message: err.message });
    }
};

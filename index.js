const mysql = require("mysql");
const nodemailer = require("nodemailer");

const fs = require("fs").promises;
const path = require("path");

const SENDER_EMAIL = "";
const SENDER_PASWD = "";

// Database config
const dbConfig = {
    host: "localhost",
    user: "",
    password: "",
    database: "",
};

// Nodemailer config
const emailConfig = {
    service: "gmail",
    auth: {
        user: SENDER_EMAIL,
        pass: SENDER_PASWD,
    },
};

// Create database connection
const connection = mysql.createConnection(dbConfig);

// Connect to the database
connection.connect((err) => {
    if (err) {
        console.error("Database connection failed:", err);
        process.exit(1);
    }

    console.log("Connected to the database.");
    fetchStudentRecords();
});

function fetchStudentRecords() {
    const query = "SELECT name, email, pdf_link FROM students";

    connection.query(query, async (err, results) => {
        if (err) {
            console.error("Error fetching records:", err);
            return;
        }

        for (const student of results) {
            try {
                await sendEmailWithAttachment(student);
            } catch (error) {
                console.error(
                    `Error sending email to ${student.email}:`,
                    error
                );
            }
        }
        connection.end();
    });
}

async function sendEmailWithAttachment(student) {
    const { name, email, pdf_link } = student;
    const pdfPath = path.resolve(pdf_link);

    try {
        const pdfContent = await fs.readFile(pdfPath);
        const transporter = nodemailer.createTransport(emailConfig);

        const mailOptions = {
            from: SENDER_EMAIL,
            to: email,
            subject: `Progress Report for ${name}`,
            text: `Dear ${name},\n\nPlease find your progress report attached.\n\nRegards,\nDepartment Team`,
            attachments: [
                {
                    filename: path.basename(pdf_link),
                    content: pdfContent,
                },
            ],
        };

        const info = await transporter.sendMail(mailOptions);
        console.log(`Email sent to ${email}: ${info.response}`);
    } catch (err) {
        throw new Error(`Failed to send email to ${email}: ${err.message}`);
    }
}

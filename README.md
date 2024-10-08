
# Student Progress Report Mailer

This project is a Node.js application that sends student progress reports via email. The student's information, including their email and report location, is stored in a MySQL database, and the application fetches this data to send reports using NodeMailer.
<br>

## Requirements

- Node.js (v14.x or higher)
- MySQL (v5.x or higher)
- A valid Gmail account for sending emails
- PDF files containing the progress reports for each student
<br>

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/pandfun/Student-Report.git
   cd Student-Report
   ```

2. Install the required dependencies:
   ```bash
   npm install
   ```
<br>

---



## Setup

> [!IMPORTANT]  
> We need to edit the `index.js` file to add configurations for the mail and mysql connection.

<br>

```javascript
const SENDER_EMAIL = "";
const SENDER_PASWD = "";

// Database config
const dbConfig = {
    host: "localhost",
    user: "",
    password: "",
    database: "",
};
```
<br>

- `host`: The MySQL server host, typically `localhost`.
- `user`: Your MySQL username.
- `password`: Your MySQL password.
- `name`: The name of the MySQL database.
- `SENDER_EMAIL`: The Gmail account email address used for sending the reports.
- `SENDER_PASWD`: Your Gmail app password (generated from Google’s "App Passwords" if 2-step verification is enabled).

<br>

---


## Database Setup

1. Log into MySQL:


2. Create the database:
   ```sql
   CREATE DATABASE student_report;
   ```


3. Use the new database:
   ```sql
   USE student_report;
   ```


4. Create the `students` table:
   ```sql
   CREATE TABLE students (
       id INT AUTO_INCREMENT PRIMARY KEY,
       name VARCHAR(100) NOT NULL,
       email VARCHAR(100) NOT NULL,
       pdf_link VARCHAR(255) NOT NULL
   );
   ```


5. Insert data into the `students` table:
   
Example data entry : 
   ```sql
   INSERT INTO students (name, email, pdf_link) VALUES ('ABC', 'abc@gmail.com', './REPORTS/Report5.pdf');
   ```
<br>

---

## How to Run

1. Start the MySQL server:

   Ensure that your MySQL server is running before starting the application.

3. Run the Node.js application:
   ```bash
   node index.js
   ```

4. The application will fetch student information from the database and send their respective progress report PDFs to their email addresses.

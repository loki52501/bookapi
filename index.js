const express = require('express');
const multer = require('multer');
const { Client } = require('pg');
const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to your PostgreSQL database using pg
const db = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});

// Handle PostgreSQL connection errors
db.connect()
  .then(() => {
    console.log('Connected to PostgreSQL database');
  })
  .catch(err => {
    console.error('Error connecting to PostgreSQL:', err.message);
    process.exit(1); // Exit the application if connection fails
  });

// Multer configuration for file upload
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Express route to handle file upload
app.post('/upload', upload.single('csvFile'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    const fileBuffer = req.file.buffer.toString();
    const rows = fileBuffer.split('\n').map(row => row.split(',')).filter(row => row.length > 0);
    rows.pop();

    // Check if there are at least two rows (headers and data)
    if (rows.length < 2) {
      return res.status(400).send('Invalid CSV format. At least two rows are required.');
    }

    // Assuming the first row contains column headers
    const headers = rows.shift().map(header => header.trim().replace(/\r/g, ''));

    // Check if the number of columns in each row matches the number of headers
    const invalidRow = rows.find(row => row.length !== headers.length);
    if (invalidRow) {
      return res.status(400).send('Invalid CSV format. Number of columns does not match the headers.');
    }

    const tableName = "user1";
    
    const columns = headers.map(header => `"${header}"`).join(', ');
    
    const values = rows.map(row => row.map(value => `'${value.trim().replace(/'/g, "''")}'`).join(', '));
    
    const query = {
      text: `INSERT INTO "${tableName}" (${columns}) VALUES ${values.map(row => `(${row})`).join(', ')}`,
    };
    
    await db.query(query);

    res.status(200).send('File uploaded and data inserted into the database.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

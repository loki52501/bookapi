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
    console.log(fileBuffer);
    const rows = fileBuffer.split('\n').map(row => row.split(','));

    // Assuming the first row contains column headers
    const headers = rows.shift();

    // Do something with the data, for example, insert into PostgreSQL
    const tableName = "public.user1";//"public.\""+"user\"";
    const values = rows.map(row => row.map(value => "'" + value.replace(/'/g, "''") + "'").join(', '));
    console.log("Values: ", values);
    const query = `INSERT INTO ${tableName} (${headers.map(header => `"${header}"`).join(', ')}) VALUES ${values.map(row => `(${row})`).join(', ')}`;
    console.log("query: ",query);
    // Execute the query
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

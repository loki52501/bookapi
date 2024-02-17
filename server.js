const express = require('express');
const multer = require('multer');
const { Client } = require('pg');
const stream = require('stream');  // Import the 'stream' module
const dotenv = require('dotenv');
const copyFrom = require('pg-copy-streams').from;

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

const db = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});

db.connect()
  .then(() => {
    console.log('Connected to PostgreSQL database');
  })
  .catch(err => {
    console.error('Error connecting to PostgreSQL:', err.message);
    process.exit(1);
  });

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(express.static('public'));

app.post('/upload', upload.single('csvFile'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    const tableName = "user1";
    const stream = db.query(copyFrom(`COPY ${tableName} FROM STDIN CSV`));

    const bufferStream = new stream.PassThrough();  // Use 'stream.PassThrough'
    bufferStream.end(req.file.buffer);

    bufferStream.pipe(stream)
      .on('finish', () => {
        res.status(200).send('File uploaded and data inserted into the database.');
      })
      .on('error', (err) => {
        console.error(err);
        res.status(500).send('Internal Server Error');
      });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

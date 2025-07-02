const express = require('express');
const multer = require('multer');
const path = require('path');
const mysql = require('mysql2/promise');

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// MySQL database connection configuration
const dbConfig = {
  host: 'localhost',
  user: 'root', // Replace with your MySQL username
  password: '', // Replace with your MySQL password
  database: 'hostel_db' // Replace with your database name
};

// Create MySQL connection pool
const pool = mysql.createPool(dbConfig);

// Initialize database and create hostels table
async function initializeDatabase() {
  try {
    const connection = await pool.getConnection();
    await connection.query(`
      CREATE TABLE IF NOT EXISTS hostels (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        location VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        imagePath VARCHAR(255) NOT NULL
      )
    `);
    console.log('Hostels table ready');
    connection.release();
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 1000000 }, // 1MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb('Error: Images only (jpeg, jpg, png)!');
  }
});

// POST endpoint to upload hostel details
app.post('/api/hostels', upload.single('image'), async (req, res) => {
  const { name, location, description } = req.body;
  const image = req.file ? req.file.path : null;

  if (!name || !location || !description || !image) {
    return res.status(400).json({ error: 'All fields (name, location, description, image) are required' });
  }

  try {
    const [result] = await pool.query(
      'INSERT INTO hostels (name, location, description, imagePath) VALUES (?, ?, ?, ?)',
      [name, location, description, image]
    );

    const hostel = { id: result.insertId, name, location, description, imagePath: image };
    res.status(201).json({ message: 'Hostel uploaded successfully', hostel });
  } catch (error) {
    console.error('Error saving hostel:', error);
    res.status(500).json({ error: 'Failed to save hostel' });
  }
});

// GET endpoint to retrieve all hostels
app.get('/api/hostels', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM hostels');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching hostels:', error);
    res.status(500).json({ error: 'Failed to fetch hostels' });
  }
});

// Initialize database and start the server
initializeDatabase().then(() => {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
});
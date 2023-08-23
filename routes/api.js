const express = require('express');
const mysql = require('mysql2/promise');

const router = express.Router();

// Create a MySQL connection pool
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "St@r1234",
    database: "new_quiz",
});

// Define the API route
router.get('/quizzes/:quizId', async (req, res) => {
  const quizId = req.params.quizId;

  try {
    // Fetch quiz details
    const [quizRows] = await pool.query('SELECT * FROM quiz WHERE quiz_id = ?', [quizId]);
    const quiz = quizRows[0];

    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    // Fetch questions and options
    const [mcqsRows] = await pool.query('SELECT * FROM mcqs WHERE quiz_id = ?', [quizId]);
    const [trueFalseRows] = await pool.query('SELECT * FROM true_or_false WHERE quiz_id = ?', [quizId]);

    const questions = mcqsRows.concat(trueFalseRows);

    // Prepare the response JSON
    const response = {
      quiz: quiz,
      questions: questions,
    };

    // Send the JSON response
    res.json(response);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;

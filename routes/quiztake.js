const express = require('express');
const router = express.Router();
const { createConnection } = require('../connection1'); // Import the connection function

router.post('/api/submitResult', (req, res) => {
  const { quizId, userName, score } = req.body;

  // Insert the quiz result into the database
  const currentTime = new Date().toISOString();

  const connection = createConnection(); // Create a new connection

connection.query(
  'INSERT INTO results (quiz_id, username, score, time) VALUES (?, ?, ?, NOW())',
  [quizId, userName, score],
  (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ message: 'Error submitting result' });
    } else {
      console.log('Quiz result submitted successfully');
      res.status(200).json({ message: 'Result submitted successfully' });
    }

    connection.end(); // Close the connection
  }
);

});

module.exports = router;

const express = require('express');
const router = express.Router();
const fetch = require('axios');

// API endpoint to fetch quiz data from an external API
router.get('/:quizid', async (req, res) => {
    const quizId = req.params.quizid;
    const apiUrl = `http://localhost:3000/api/quizzes/${quizId}`;

    try {
        // Fetch quiz data from the external API
        const response = await fetch(apiUrl);
        if (!response.ok) {
            // Handle API error
            throw new Error('Quiz data not available');
        }

        const quizData = await response.json();
        res.json(quizData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching quiz data' });
    }
});

module.exports = router;

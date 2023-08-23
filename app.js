const express = require("express");
const app = express();
const port = 3000;
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const apiRouter = require("./routes/api");
const createTables = require("./routes/tables");


// Set up middleware
app.use(cors());
app.use(bodyParser.json());

// View Engine Configuration
app.set("view engine", "hbs");
app.set("views", "./view");
app.use(express.static(__dirname + "/public"));

// Define routes for static HTML files
app.get('/quizview', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'quizview.html'));
}); 

app.get('/quiztake', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'quiztake.html'));
}); 

app.get('/user', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'live.html'));
});

// Use the routes from quizmanagement.js
const routes = require('./routes/quizmanagement');
app.use('/', routes);

// Use the API router
app.use("/api", apiRouter);

// Use the quiz view route
const quizViewRouter = require('./routes/quizview');
app.use('/api/quizzes', quizViewRouter);


// Use the quiztake router
const quizTakeRouter = require('./routes/quiztake');
app.post('/api/submitResult', quizTakeRouter);

// Call the createTables function when the server starts
createTables();

// Start the server
app.listen(port, (err) => {
    if (err) throw err;
    else console.log("Server is running on %d", port);
});

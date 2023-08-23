const mysql = require("../connection").con;

const createTables = () => {
  const createQuizTable = `
    CREATE TABLE IF NOT EXISTS quiz (
      quiz_id VARCHAR(255) PRIMARY KEY NOT NULL,
      quiz_name VARCHAR(255) NOT NULL,
      quiz_desc VARCHAR(255) NOT NULL,
      level VARCHAR(255) DEFAULT NULL
    );
  `;

  const createTrueOrFalseTable = `
    CREATE TABLE IF NOT EXISTS true_or_false (
      question VARCHAR(1000) PRIMARY KEY NOT NULL,
      option_1 VARCHAR(255) NOT NULL,
      option_1_is_correct VARCHAR(255) NOT NULL,
      option_2 VARCHAR(255) NOT NULL,
      option_2_is_correct VARCHAR(255) NOT NULL,
      quiz_id VARCHAR(255) NOT NULL,
      FOREIGN KEY (quiz_id) REFERENCES quiz(quiz_id)
    );
  `;

  const createMcqsTable = `
    CREATE TABLE IF NOT EXISTS mcqs (
      question VARCHAR(1000) PRIMARY KEY NOT NULL,
      option_1 VARCHAR(255) NOT NULL,
      option_1_is_correct VARCHAR(255) NOT NULL,
      option_2 VARCHAR(255) NOT NULL,
      option_2_is_correct VARCHAR(255) NOT NULL,
      option_3 VARCHAR(255) NOT NULL,
      option_3_is_correct VARCHAR(255) NOT NULL,
      option_4 VARCHAR(255) NOT NULL,
      option_4_is_correct VARCHAR(255) NOT NULL,
      quiz_id VARCHAR(255) NOT NULL,
      FOREIGN KEY (quiz_id) REFERENCES quiz(quiz_id)
    );
  `;

  const createResultsTable = `
    CREATE TABLE IF NOT EXISTS results (
      username VARCHAR(255) NOT NULL,
      score INT NOT NULL,
      quiz_id VARCHAR(255) NOT NULL,
      time TIMESTAMP
    );
  `;

  const queries = [
    createQuizTable,
    createTrueOrFalseTable,
    createMcqsTable,
    createResultsTable,
  ];

  queries.forEach((query) => {
    mysql.query(query, (err) => {
      if (err) throw err;
      console.log("Table created successfully.");
    });
  });
};

module.exports = createTables;

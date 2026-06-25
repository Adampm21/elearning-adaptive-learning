const db = require("../config/db");

exports.getQuestions = (req, res) => {
  db.query(
    "SELECT * FROM questions",
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json(result);
    }
  );
};

exports.createQuestion = (req, res) => {
  const {
    quiz_id,
    question_text,
    correct_answer,
  } = req.body;

  if (
    !quiz_id ||
    !question_text ||
    !correct_answer
  ) {
    return res.status(400).json({
      message: "All fields required",
    });
  }

  const sql =
    "INSERT INTO questions (quiz_id, question_text, correct_answer) VALUES (?, ?, ?)";

  db.query(
    sql,
    [
      quiz_id,
      question_text,
      correct_answer,
    ],
    (err, result) => {
      if (err)
        return res.status(500).json(err);

      res.status(201).json({
        message: "Question created",
      });
    }
  );
};

exports.deleteQuestion = (req, res) => {
  db.query(
    "DELETE FROM questions WHERE id=?",
    [req.params.id],
    (err, result) => {
      if (err)
        return res.status(500).json(err);

      res.json({
        message: "Question deleted",
      });
    }
  );
};
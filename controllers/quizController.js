const db = require("../config/db");

exports.getQuizzes = (req, res) => {
  db.query("SELECT * FROM quizzes", (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);
  });
};

exports.createQuiz = (req, res) => {
  const { course_id, title } = req.body;

  if (!course_id || !title) {
    return res.status(400).json({
      message: "All fields required",
    });
  }

  const sql =
    "INSERT INTO quizzes (course_id, title) VALUES (?, ?)";

  db.query(sql, [course_id, title], (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.status(201).json({
      message: "Quiz created",
    });
  });
};

exports.deleteQuiz = (req, res) => {
  db.query(
    "DELETE FROM quizzes WHERE id=?",
    [req.params.id],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Quiz deleted",
      });
    }
  );
};
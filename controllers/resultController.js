const db = require("../config/db");

exports.getResults = (req, res) => {
  db.query(
    "SELECT * FROM quiz_results",
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(result);
    }
  );
};

exports.submitResult = (req, res) => {
  const { quiz_id, score } = req.body;

  if (!quiz_id || score === undefined) {
    return res.status(400).json({
      message: "Quiz ID and score required",
    });
  }

  const sql =
    "INSERT INTO quiz_results (user_id, quiz_id, score) VALUES (?, ?, ?)";

  db.query(
    sql,
    [req.user.id, quiz_id, score],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      let level = "beginner";

      if (score >= 80) {
        level = "advanced";
      } else if (score >= 60) {
        level = "intermediate";
      }

      db.query(
        "UPDATE users SET level_ability=? WHERE id=?",
        [level, req.user.id],
        (err2) => {
          if (err2) {
            return res.status(500).json(err2);
          }

          res.status(201).json({
            message: "Result submitted",
            level,
          });
        }
      );
    }
  );
};
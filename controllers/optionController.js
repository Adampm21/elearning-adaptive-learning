const db = require("../config/db");

exports.getOptions = (req, res) => {
  db.query(
    "SELECT * FROM options",
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json(result);
    }
  );
};

exports.createOption = (req, res) => {
  const {
    question_id,
    option_text,
  } = req.body;

  if (
    !question_id ||
    !option_text
  ) {
    return res.status(400).json({
      message: "All fields required",
    });
  }

  const sql =
    "INSERT INTO options (question_id, option_text) VALUES (?, ?)";

  db.query(
    sql,
    [
      question_id,
      option_text,
    ],
    (err, result) => {
      if (err)
        return res.status(500).json(err);

      res.status(201).json({
        message: "Option created",
      });
    }
  );
};

exports.deleteOption = (req, res) => {
  db.query(
    "DELETE FROM options WHERE id=?",
    [req.params.id],
    (err, result) => {
      if (err)
        return res.status(500).json(err);

      res.json({
        message: "Option deleted",
      });
    }
  );
};
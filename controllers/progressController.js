const db = require("../config/db");

exports.completeMaterial = (req, res) => {
  const { material_id } = req.body;

  if (!material_id) {
    return res.status(400).json({
      message: "Material ID required",
    });
  }

  const sql =
    "INSERT INTO learning_progress (user_id, material_id) VALUES (?, ?)";

  db.query(
    sql,
    [req.user.id, material_id],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.status(201).json({
        message: "Material completed",
      });
    }
  );
};

exports.getProgress = (req, res) => {
  const sql = `
    SELECT
      lp.id,
      m.title,
      lp.completed_at
    FROM learning_progress lp
    JOIN materials m
    ON lp.material_id = m.id
    WHERE lp.user_id = ?
  `;

  db.query(
    sql,
    [req.user.id],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(result);
    }
  );
};
const db = require("../config/db");

exports.getMaterials = (req, res) => {
  db.query("SELECT * FROM materials", (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);
  });
};

exports.createMaterial = (req, res) => {
  const { course_id, title, content, difficulty } = req.body;

  if (!course_id || !title || !content || !difficulty) {
    return res.status(400).json({
      message: "All fields required",
    });
  }

  const sql =
    "INSERT INTO materials (course_id, title, content, difficulty) VALUES (?, ?, ?, ?)";

  db.query(
    sql,
    [course_id, title, content, difficulty],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.status(201).json({
        message: "Material created",
      });
    }
  );
};

exports.updateMaterial = (req, res) => {
  const { title, content, difficulty } = req.body;

  db.query(
    "UPDATE materials SET title=?, content=?, difficulty=? WHERE id=?",
    [title, content, difficulty, req.params.id],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Material updated",
      });
    }
  );
};

exports.deleteMaterial = (req, res) => {
  db.query(
    "DELETE FROM materials WHERE id=?",
    [req.params.id],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Material deleted",
      });
    }
  );
};
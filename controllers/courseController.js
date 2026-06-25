const db = require("../config/db");

exports.getCourses = (req, res) => {
  db.query("SELECT * FROM courses", (err, result) => {
    if (err) {
      return res.status(500).json(err);
    }

    res.json(result);
  });
};

exports.getCourseById = (req, res) => {
  db.query(
    "SELECT * FROM courses WHERE id=?",
    [req.params.id],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json(result);
    }
  );
};

exports.createCourse = (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({
      message: "Title and description required",
    });
  }

  const sql =
    "INSERT INTO courses (title, description, created_by) VALUES (?, ?, ?)";

  db.query(
    sql,
    [title, description, req.user.id],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.status(201).json({
        message: "Course created",
      });
    }
  );
};

exports.updateCourse = (req, res) => {
  const { title, description } = req.body;

  db.query(
    "UPDATE courses SET title=?, description=? WHERE id=?",
    [title, description, req.params.id],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Course updated",
      });
    }
  );
};

exports.deleteCourse = (req, res) => {
  db.query(
    "DELETE FROM courses WHERE id=?",
    [req.params.id],
    (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Course deleted",
      });
    }
  );
};
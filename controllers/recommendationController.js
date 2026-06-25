const db = require("../config/db");

exports.getRecommendations = (req, res) => {
  const userId = req.user.id;

  const userSql =
    "SELECT level_ability FROM users WHERE id=?";

  db.query(userSql, [userId], (err, userResult) => {
    if (err) {
      return res.status(500).json(err);
    }

    const level =
      userResult[0].level_ability;

    const materialSql =
      "SELECT * FROM materials WHERE difficulty=?";

    db.query(
      materialSql,
      [level],
      (err, materialResult) => {
        if (err) {
          return res.status(500).json(err);
        }

        res.json({
          level,
          recommendations: materialResult,
        });
      }
    );
  });
};
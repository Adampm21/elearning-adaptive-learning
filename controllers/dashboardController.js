const db = require("../config/db");

exports.getDashboard = (req, res) => {

  const userId = req.user.id;

  const reportSql = `
    SELECT
      u.id,
      u.name,
      u.email,
      u.level_ability,

      COUNT(DISTINCT qr.id) AS total_quiz,

      IFNULL(AVG(qr.score),0) AS average_score,

      COUNT(DISTINCT lp.id) AS completed_materials

    FROM users u

    LEFT JOIN quiz_results qr
      ON u.id = qr.user_id

    LEFT JOIN learning_progress lp
      ON u.id = lp.user_id

    WHERE u.id = ?

    GROUP BY u.id
  `;

  db.query(reportSql,[userId],(err,reportResult)=>{

    if(err){
      return res.status(500).json(err);
    }

    const level =
      reportResult[0].level_ability;

    const materialSql =
      "SELECT * FROM materials WHERE difficulty=?";

    db.query(
      materialSql,
      [level],
      (err,materialResult)=>{

        if(err){
          return res.status(500).json(err);
        }

        res.json({
          profile: reportResult[0],
          recommendations: materialResult
        });

      }
    );

  });

};
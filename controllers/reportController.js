const db = require("../config/db");

exports.getLearningReport = (req, res) => {

  const userId = req.user.id;

  const sql = `
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

  db.query(sql,[userId],(err,result)=>{

    if(err){
      return res.status(500).json(err);
    }

    res.json(result[0]);

  });

};
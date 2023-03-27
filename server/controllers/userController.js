const mysql = require("mysql");

const con = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
});

exports.view = (req, res) => {
  con.getConnection((err, connection) => {
    if (err) throw err;
    connection.query("select * from users", (err, rows) => {
      connection.release();
      if (!err) {
        res.render("home", { rows });
      } else {
        console.log("Error in Listening data" + err);
      }
    });
  });
};

exports.adduser = (req, res) => {
  res.render("adduser");
};

exports.save = (req, res) => {
  con.getConnection((err, connection) => {
    if (err) throw err;

    const { name, age, city } = req.body;

    connection.query(
      "insert into users(NAME,AGE,CITY) values(?,?,?)",
      [name, age, city],
      (err, rows) => {
        connection.release();
        if (!err) {
          res.render("adduser", { msg: "User Details Added Success" });
        } else {
          console.log("Error in Listening data" + err);
        }
      }
    );
  });
};

exports.edituser = (req, res) => {
  con.getConnection((err, connection) => {
    if (err) throw err;

    let id = req.params.id;

    connection.query("select * from  users where id=?", [id], (err, rows) => {
      connection.release();
      if (!err) {
        res.render("editUser", { rows });
      } else {
        console.log("Error in Listening data" + err);
      }
    });
  });
};
exports.edit = (req, res) => {
  con.getConnection((err, connection) => {
    if (err) throw err;

    const { name, age, city } = req.body;

    let id = req.params.id;

    connection.query(
      "UPDATE users set NAME=?,AGE=?,CITY=? where ID=?",
      [name, age, city, id],
      (err, rows) => {
        connection.release();
        if (!err) {
          con.getConnection((err, connection) => {
            if (err) throw err;

            let id = req.params.id;

            connection.query(
              "select * from  users where id=?",
              [id],
              (err, rows) => {
                connection.release();
                if (!err) {
                  res.render("editUser", {
                    rows,
                    msg: "Friend Details Updated Success",
                  });
                } else {
                  console.log("Error in Listening data" + err);
                }
              }
            );
          });
        } else {
          console.log("Error in Listening data" + err);
        }
      }
    );
  });
};

exports.delete=(req,res)=>{
    con.getConnection((err,connection)=>{
        if(err) throw err
        let id=req.params.id;
        connection.query("delete from users where id=?",[id],(err,rows)=>{
            connection.release();
            if(!err){
                res.redirect("/");
            }
            else{
                console.log("err");
            }
        });
    });
};
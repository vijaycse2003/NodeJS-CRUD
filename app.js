const express = require("express");
const exphbs = require("express-handlebars");
const bodyparser = require("body-parser");
const mysql = require("mysql");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

//Static files

app.use(express.static("public"));

//Template engine

const handlebar = exphbs.create({ extname: ".hbs" });
app.engine("hbs", handlebar.engine);
app.set("view engine", "hbs");

//Mysql
/* 
const con = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS
});

//Connection check database

con.getConnection((err,connection)=>{
    if(err) throw err
      console.log("Connection Success");
})
 */
//Router

// app.get("/", (req, res) => {
//   res.render("home");
// });
const routes=require("./server/controllers/routes/users")
app.use("/",routes);

app.listen(port, () => {
  console.log("Listening Port  :" + port);
});

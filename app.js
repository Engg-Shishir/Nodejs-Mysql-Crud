
//Part 01  Import Module

var path = require("path");
var express = require("express");
var ejs = require("ejs");
var bodyParser = require("body-parser");
var mysql = require('mysql');
var app = express();
var request = require('request');


//Part 04   Create database connection
var conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database:"nodejs_login1"
});
conn.connect(function(err) {
  if (err) throw err;
  console.log("Database Connected!");
});






//Part 05 Define view engin with ejs / public path / view file path/ bodyparser
//set views file
app.set('views', path.join(__dirname,'views'));
//set view engine
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));




//Get value from database and show in html table using ExpressJs/ NodeJs/ Mysql
app.get('/',(req, res) => {
 
 let sql = "SELECT * FROM users";
  let query = conn.query(sql, (err, rows) =>{
    if(err) throw err;

    res.render('user_index',{
     title:'Crud Operation uing Nodejs / ExpressJs / mysql ',
     users: rows,
    });
  });
})


//Add value in database
app.get('/add',(req, res) => {
  res.render('user_add',{
   title:'Crud Operation uing Nodejs / ExpressJs / mysql '
  });
});

app.post('/save',(req, res) => {
  
 let data = {first_name: req.body.fname, last_name: req.body.lname, email: req.body.email };

 let sql = "INSERT INTO users SET ?";
 let query = conn.query(sql, data, (err, result) => {
     if(err) throw err;
     res.redirect('/');
 });
});


//Update value in database
app.get('/edit/:userid',(req, res) => {
  const userid = req.params.userid;
  let sql = `SELECT * FROM users where id = ${userid}`;
  let query = conn.query(sql,(err, result) => {
      if(err) throw err;
      res.render('user_edit',{
       title:'Crud Operation uing Nodejs / ExpressJs / mysql ',
       user:result[0],
      });
  });
 });
 
app.post('/update',(req, res) => {
  const userid = req.body.id;

  let sql = "UPDATE users SET first_name='"+req.body.fname+"',last_name='"+req.body.lname+"',email='"+req.body.email+"' WHERE id="+userid;


  let query = conn.query(sql,(err, result) => {
      if(err) throw err;
      res.redirect('/');
  });
 });
 




//Delete value in database
app.get('/delete/:userid',(req, res) => {
  const userid = req.params.userid;
  let sql = `DELETE FROM users WHERE id = ${userid}`;
  let query = conn.query(sql,(err, result) => {
      if(err) throw err;
      res.redirect('/');
  });
});
 

//Part 02    Server Listining
var port = 4000;
app.listen(port, function(){
 console.log("http://localhost:"+port);
});
//Part 03  nodemon app or npm start












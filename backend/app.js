const express = require("express")
// const bodyParser = require("body-parser")
const mysql = require("mysql")
const app = express()
const cors = require('cors')
app.use(express.json())
app.use(cors())
// db connection
const db = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: '',
    database: 'dbsmschool'
})

// Establish database connection
db.connect(function(error){
    try {
        console.log("Connected to database")
    } catch (error) {
        console.log("Connection Failed: ", error)
    }
})


// Insert function
app.post("/post", function(req, res){
    let details = {
        stname: req.body.stname,
        course: req.body.course,
        fee: req.body.fee
    }
    let sql = "INSERT INTO student SET ?"
    db.query(sql, details, function(error){
        try {
            res.send({ status:true, message: "Student record inserted successfully" })
        } 
        catch (error) {
            res.send({ status:false, message: "Student recorded insertion failed: ", error })
        }
    })
})

// Read function
app.get("/get", function(req, res){
    var sql = "SELECT * FROM student"
    db.query(sql, function(error, result){
        try {
            res.send({ status: true, data: result })
        } catch (error) {
            res.send({ status: false, error })
        }
    })
})

// Search by id
app.get("/get/:id", function(req, res){
    var studentid = req.params.id
    var sql = "SELECT * FROM student WHERE id =" + studentid
    db.query(sql,function(error, result){
        try {
            res.send({ status: true, data:result })
        } catch (error) {
            res.send({ status: false, error })
        }
    } )
})

// Update function
app.put("/put/:id", function(req, res){
    console.log(req.body)
    var studentid = req.params.id
    var sql = `UPDATE students SET stname ="${req.body.stname}" , course="${req.body.course}" , fee =${req.body.fee}   WHERE id =` + studentid 
    db.query(sql, function(error, result){
        try {
            res.send({ status:true, message: "Student record updated successfully" })
        } catch (error) {
            res.send({ status: false, error })
        }
    })
})

// Delete function
app.delete("/delete/:id", function(req, res){
    var studentid = req.params.id
    var sql = "DELETE FROM student WHERE id= " + studentid
    db.query(sql, function(error, result){
        try{
            res.send({ status: true, message:"Record deleted" })
        } catch (error) {
            res.send( {status: false, message: "Record deletion failed"  } )
        }
    })
})

// Port for server to run
app.listen(8085, function(error){
    try {
        console.log("Connected to the server...8085")
    } catch(error) {
        console.log("Connection failed: ", error)
    }
})


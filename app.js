const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config({ path: "./.env" });

const app = express();

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST   ,
    user : process.env.DATABASE_USER ,
    password: process.env.DATABASE_PASSWORD,   
    database: process.env.DATABASE 
});
module.exports = db;

// app.use(express.json());
app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

db.connect((err) => {
    if (err) {
        console.error("Error connecting to the database:", err);
        return;
    }
    console.log("Connected to the database");
});


//define routes
const pagesRouter = require("./routes/pages");
app.use("/", pagesRouter);
const authRouter = require("./routes/auth");
app.use("/auth", authRouter);

app.listen(5001,() => {
    console.log("Server started on Port 5001");
})
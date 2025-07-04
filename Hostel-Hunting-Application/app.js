const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");


const path = require("path");
const session = require("express-session");

dotenv.config({ path: "./.env" });

const app = express();

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST   ,
    user : process.env.DATABASE_USER ,
    password: process.env.DATABASE_PASSWORD,   
    database: process.env.DATABASE 
});
module.exports = db;

app.use(express.json());
app.use(express.static("Frontend"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

db.connect((err) => {
    if (err) {
        console.error("Error connecting to the database:", err);
        return;
    }
    console.log("Connected to the database");
});

app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false
}));

//define routes
const pagesRouter = require("./routes/pages");
app.use("/", pagesRouter);
const authRouter = require("./routes/auth");
app.use("/auth", authRouter);
// const adminRouter = require("./routes/admin");
// app.use("/admin", adminRouter);
const apiRouter = require("./routes/api");
app.use("/api", apiRouter);
const searchRouter = require("./routes/search");
app.use("/search", searchRouter);   
const bookingRouter = require("./models/booking");
app.use("/bookings", bookingRouter);
// const hostelUploadRouter = require("./routes/hostelRouter");
// app.use("/upload", hostelUploadRouter);

app.listen(5001,() => {
    console.log("Server started on Port 5001");
})
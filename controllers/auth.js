const db = require	("../app.js");
const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");


exports.register = (req, res) => {
   
    console.log("incoming data: ",req.body);
    const { fullname, username, email, phoneNumber, password } = req.body;
    
     if (!fullname || !username || !email || !phoneNumber || !password) {
        return res.status(400).send("All fields are required");
    }
    db.query(
        "SELECT email_address FROM users WHERE email_address = ?",
        [email],
        (error, results) => {
            if (error) {
                console.error("Error checking email:", error);
                return res.status(500).send("Server error");
            }
            if (results.length > 0) {
                return res.status(409).send("Email already exists");
            }
            // let hashedPassword = await bcrypt.hash(password, 5);
            // console.log("Hashed Password:", hashedPassword);
            db.query(
            "INSERT INTO users (full_name, username, email_address, password, phone_number) VALUES (?, ?, ?, ?, ?)",
            [fullname, username, email, password, phoneNumber],
            (error, results) => {
                if (error) {
                    console.error("Error inserting data:", error);
                    return res.status(500).send("Server error");
                }
                console.log("User registered successfully:", results);
                return res.redirect("/login");  
            });
            
        });
    }
    exports.login = (req, res) => {
    const { email, password } = req.body;  
    if (!email || !password) {
        return res.status(400).send("Email and password are required");
    }
    db.query(
        "SELECT * FROM users WHERE email_address = ?",
        [email],
        async(error, results) => {
            if (error) {
                console.error("Error fetching user:", error);
                return res.status(500).send("Server error");
            }
            if (results.length === 0) {
                return res.status(401).send("Invalid email or password");
            }
            const user = results[0];
            
            if (user.password !== password) { 
                return res.status(401).send("Invalid email or password");
            }
            return res.redirect("/index.html");
        }
    );
}
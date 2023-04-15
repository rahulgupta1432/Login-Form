const express=require("express");
const { rmSync } = require("fs");
const { dirname } = require("path");
const app = express();
const path = require("path");
require("../db/conn");
const Register = require("../model/registers");
const port = process.env.port || 5501;


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "hbs");

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname+'/index.html'));
});
app.get("/Log%20in%20and%20register%20page/index.html",(req,res)=>{
    res.sendFile(path.join(__dirname+'/index.html'));
});
app.get("/register", (req, res) => { 
    res.sendFile(path.join(__dirname+'/register.html'));
})


// create new user in our database
app.post("/register", async (req, res) => { 
    try {
        const password = req.body.password;
        const confirmpassword = req.body.confirmpassword;
        if (password === confirmpassword) {
            const registerCustomer = new Register({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: password,
                confirmpassword: req.body.confirmpassword
            })
            const register = await registerCustomer.save();
            res.status(200).sendFile(path.join(__dirname, "../Main page/home.html"));
            console.log(path.join(__dirname, "../Main page/home.html"));
        } else { 
            res.send("password doesn't match");
        }
    } catch (err) { 
        res.status(400).send(err);
    }
})
app.listen(port,()=>{
    console.log("listining port 5500");
});
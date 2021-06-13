require('dotenv').config()
const express = require("express");
const cors= require("cors");
const client = require("./config/db");

const authRoutes = require("./routes/auth");
const msgRoutes = require("./routes/msg");

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 8000;

app.get("/", (req, res)=>{
    res.status(200).send("Server is up and running");
});

app.use("/auth", authRoutes);
app.use("/msg", msgRoutes);

//CONNECTING TO DB
client.connect(()=>{
    console.log("Connected to DB");
});

//STARTING PORT
app.listen( PORT, ()=>{
    console.log(`server running on port ${PORT}`);
}); 

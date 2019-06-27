// const express = require('express');
import express from "express";
const app = express();

const PORT = 4000;

const hendleListening =() => 
console.log(`Listening on: http://localhost:${PORT}`);

const handleHome = (req, res) => res.send('Hello from ass!!!!!!');
const handleProfile=(req, res) => res.send("You are on my Profile");

app.get("/",handleHome);  

app.get("/profile", handleProfile);

app.listen(PORT, hendleListening); //포트 번호
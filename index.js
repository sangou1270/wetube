const express = require('express');
const app = express();

const PORT = 4000;

function hendleListening () {
    console.log(`Listening on: http://localhost:${PORT}`);
}
function handleHome(req, res) {
    // console.log('Hi from Home!!!!!')
    // console.log(req);
    res.send('Hello from Home!!!!!!')
}
function handleProfile(req, res){
    res.send("You are on my Profile")
}
app.get("/",handleHome);

app.get("/profile", handleProfile);

app.listen(PORT, hendleListening); //포트 번호
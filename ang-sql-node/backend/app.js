const express = require('express');
const app = express()
const PORT = process.env.PORT || 3000;
const db = require('./util/database');
const bodyParser = require('body-parser');
const cors= require('cors');

app.use(cors())

// app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

db.connect(err => {
    if(err){
        console.log(err)
    }
    console.log("Database connected successfuly");
})



app.get('/users',(req,res)=>{
    db.execute("SELECT * FROM users")
    .then(results=>{
        return results
    })
    .then(([data,buf])=>{
        res.send(data)
    })
    .catch(err => console.log(err))
})


app.listen(PORT,err => {
    console.log(`application is running on ${PORT}`);
})
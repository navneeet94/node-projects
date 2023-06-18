const express = require('express');
const app = express()
const PORT = process.env.PORT || 3000;
const db = require('./util/database');
const bodyParser = require('body-parser');
const cors= require('cors');

app.use(cors())

app.use(bodyParser.urlencoded({extended: false}));


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

app.get('/ui',(req,res)=>{
    const html = `
    <h1>Hello World</h1>
    <form action="/users" method="POST">
    <input type="text" name="fullname" id="username" placeholder="user name" />
    <input type="text" name="email" id="emailid" placeholder="email" />
    <input type="text" name="mobile" id="mobile" placeholder="mobile" /><br />
    <button type="submit">send</button>
    </form>
    `
    res.send(html)
});

app.get('/users/:userid',(req,res)=>{
    const userid = req.params.userid;
    db.execute(`SELECT * FROM users where id=${userid}`)
    .then(results=> {
        return results;
    })
    .then(([data,buf]) => {
        //console.log(data)
        res.send(data)
    })
    .catch(err => console.log(err));
})

app.post('/users',(req,res)=> {
    console.log(req.data,"Data posted Successfully")
    let fullname = req.body.fullname
    let email = req.body.email
    let mobile = req.body.mobile
    console.log(fullname)
    console.log(email)
    console.log(mobile)
    db.execute(`insert into users(fullname,email,mobile) value('${fullname}','${email}','${mobile}')`)
    .then((result) => {
        console.log("Data Added successfully")
        console.log(result)
        res.redirect('/users')
    }).catch(err => console.log(err));
})


app.listen(PORT,err => {
    console.log(`application is running on ${PORT}`);
})
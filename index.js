var express =require('express')
var bodyParser=require('body-parser')
var mongoose=require('mongoose')
const app=express()
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    Extended:true
}))
mongoose.connect('mongodb://localhost:27017/usersDatabase')
var db =mongoose.connection
db.on('error',()=>console.log("Error in connecting to Database"))
db.once('open',()=>console.log("Connected to Database"))
app.post("/sign_up",(req,res)=>{
    var name=req.body.name
    var age=req.body.age
    var phoneno=req.body.phoneno
    var email=req.body.email
    var gender=req.body.gender
    var state=req.body.state
    var team=req.body.team
var data={
    "name":name,
    "age":age,
    "phoneno":phoneno,
    "email":email,
    "gender":gender,
    "state":state,
    "team":team
}
db.collection('users').insertOne(data,(err,collection)=>{
    if(err){
        throw err;
    }
    console.log("Record Inserted Successfully")
 })
 return res.redirect('signup_Sucessful.html')
})
app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin":'*'
    })
    return res.redirect('index.html')
}).listen(3000);
console.log("Listening on port 3000")

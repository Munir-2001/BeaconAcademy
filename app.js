const express= require("express");
const path= require("path");
// const fs= require("fs");
const app=express();
var mongoose= require('mongoose');
mongoose.connect('mongodb://localhost/BeaconAcademy',{useNewUrlParser:true});
const port = 80;
const bodyparser=require('body-parser')
// define mongoose schema

var contactSchema= new mongoose.Schema({
    name: String,
    phone:String,
    email:String,
    address:String
})
var Contact=mongoose.model('Contact', contactSchema)

app.use(express.static('static'))
app.use('/static', express.static('static'));
app.use(express.urlencoded());
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'))
app.get('/', (req,res)=>{
    const params={};
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req,res)=>{
    const params={};
    res.status(200).render('contact.pug', params);
})
app.post('/contact', (req,res)=>{
    var myData= new Contact(req.body);
    myData.save().then(()=>{
        res.send("Success!!The item has been saved to Database")
    }).catch(()=>{
        res.status(404).send("Sorry the item was not saved to database")
    })
    // res.redirect('
    // res.status(200).render('contact.pug');
})
app.listen(port,()=>{
    console.log(`app started successfully on port ${port}`);
})
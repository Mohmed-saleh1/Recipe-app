const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cons = require('consolidate')
const dust = require('dustjs-helpers')
const pg = require('pg')
const app = express();

//connection string
const connect = 'postgresql://MU-SALEH:123123@localhost/recipebookdb';

// Assign Dust Engine to .dust files
app.engine('dust',cons.dust)

// Set Default Ext .dust 
app.set('view engine','dust')
app.set('views',__dirname+'/views')

//set Public Folder 
app.use(express.static(path.join(__dirname,'public')));

// body parser middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}));

app.get('/',function (req,res) {
    console.log("Test");
})

// server
app.listen(3000,function(){
    console.log("Server started ON Port 3000");
})
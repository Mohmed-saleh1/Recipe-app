const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const cons = require('consolidate')
const dust = require('dustjs-helpers')
const pg = require('pg');
const app = express();

// creating a new client 
const config =  {
    user: 'MU-SALEH',
    host: 'localhost',
    database: 'recipebookdb',
    password: '123123',
    port: 5432, // default PostgreSQL port
  }
const pool = new pg.Pool(config);
 
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

app.get('/', (req, res, next) => {
   pool.connect(function (err, client, done) {
       if (err)  return console.log("Can not connect to the DB" + err);
    
       client.query('SELECT * FROM recipeies', function (err, result) {
            done();
            if (err)  return console.log("Can not connect to the DB" + err);
            res.render('index',{recipes:result.rows})
        })
   })
});

// server
app.listen(3000,function(){
    console.log("Server started ON Port 3000");
})
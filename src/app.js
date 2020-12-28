

const express = require('express');
const morgan = require('morgan');
const app = express();
const path = require('path');
const mysql = require('mysql');
const myConnection = require('express-myconnection');
//importar rutas
const customerRoutes = require('./routes/customer');





//settings

app.set('port', process.env.PORT || 3000);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));



//middlewares
app.use(morgan('dev'));

app.use(myConnection(mysql,{


host: 'localhost',
user: 'jerson',
password: 'jerson123',
port: 3306,
database: 'nodejs'

},'single'));

app.use(express.urlencoded({extended: false}));
//routes

app.use('/', customerRoutes);


//static files
app.use(express.static(path.join(__dirname, 'public')));

//start the server
app.listen(app.get('port'), () => {
    console.log("Connection Successful");
})


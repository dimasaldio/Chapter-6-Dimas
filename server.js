const express       = require('express');
const mongoose      = require('mongoose');
const morgan        = require('morgan');
const bodyParser    = require('body-parser');
var path            = require('path')
const route         = require('./server/routes/route')
const app           = express();

app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.set('view engine', 'ejs');

app.use('/css',express.static(path.resolve(__dirname,'assets/css')));
app.use('/img',express.static(path.resolve(__dirname,'assets/img')));
app.use('/js',express.static(path.resolve(__dirname,'assets/js')));


const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    console.log('Server connected in http://localhost:'+PORT)
})

const connectDB    = require('./server/connection/connection')
connectDB()

app.use(route)
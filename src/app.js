const express = require("express");
const router = express.Router();
const app= express();

const compression = require("compression");
const cors = require("cors")
const ejs = require("ejs");
const bodyParser = require("body-parser")
const logger = require("morgan");
const path = require("path");

const mainRoutes = require("./backend/routes/MainRoutes");

app.use(compression());
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// app.set('views', path.join(__dirname, 'client/views'));


// app.use(express.static(path.join(__dirname,  'client/views')));
// app.set('view engine', 'html');

app.set('views', path.join(__dirname, 'client/views'))
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'client/assets')));


app.use('/', mainRoutes);

app.set("port", process.env.PORT || 4000);

app.listen(app.get("port"), ()=>{
    console.log("Application running in port: " + app.get("port"));
})

module.exports = app;

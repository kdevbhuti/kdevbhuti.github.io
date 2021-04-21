const express = require("express");
const app= express();

const compression = require("compression");
const cors = require("cors")
const bodyParser = require("body-parser")
const logger = require("morgan");
const path = require("path");
const session = require("express-session")
const MongoStore = require('connect-mongo')(session);
const cookieParser = require("cookie-parser")
var flash = require('connect-flash');

const mainRoutes = require("./backend/routes/MainRoutes");
const connectDB = require("./backend/database/mongoose");

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.locals.moment = require('moment');

// creating seassion
var sessionStorage = new MongoStore({
    mongooseConnection: connectDB,
    collection: "session",
})

app.use(session({
    name: "_tvastra",
    secret: 'TvastraKey',
    resave: false,
    saveUninitialized: true,
    store: sessionStorage,
    cookie: {}
    // cookie: {
    //     maxAge: 1000 * 60 * 15, //15 min
    // }
}))
// /////////////////////////////////////////




app.use(compression());
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(flash());

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


const express = require('express');
const ejs = require('ejs');
const methodOverride = require('method-override');
const morgan = require('morgan');

const cors = require('cors');

const fs = require('fs');
const path = require('path');
//passport related
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy; 
const bodyParser = require('body-parser');

//
const favicon = require('serve-favicon');
// database
const mongo = require('mongodb');
const {mongoose} = require('./db/mongoose');
const {User} = require('./models/user');
const {Post} = require('./models/post');
const db = mongoose.connection;

/* //i18n
const i18n = require('i18n-express'); */

const i18next = require('i18next');
const i18nextMiddleware = require('i18next-express-middleware');
const Backend = require('i18next-node-fs-backend'); // must change variable name 

//app
const app = express();
const port = process.env.PORT || 3005;


// Socket IO and Shit
const http = require('http');
const socketIO = require('socket.io');
var server = http.createServer(app);
var io = socketIO(server);

// Make io accessible to our router
app.use(function(req,res,next){
    req.io = io;
    next();
});


app.set('views', `${__dirname}/views`);

app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')))

app.use(expressValidator());
app.use(flash());

//Handle Express Sessions
app.use(session({
	secret: 'secret',
	resave: false,
	saveUninitialized: false
}));


//Passport

// Passport Setups
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// pass currentUser to all routes

app.use((req, res, next) => {
  res.locals.currentUser = req.user; // req.user is an authenticated user
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});


app.use(methodOverride('_method'));
// morgan
var logDirectory = path.join(__dirname, '../log');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

app.use(morgan('combined', {
  stream: fs.createWriteStream(path.join(logDirectory, 'access.log'), {flags: 'a'})
}));

app.use(cors());

i18next
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    ns: ['common', 'login', 'register', 'profile', 'category', 'post', 'comment', 'chat', 'translation'],
    backend: {
      loadPath: __dirname + '/translations/{{lng}}/{{ns}}.json',
      addPath: __dirname + '/translations/{{lng}}/{{ns}}.missing.json'
    },
    fallbackLng: 'en',
    preload: ['en', 'es'],
    saveMissing: true
  });

app.use(i18nextMiddleware.handle(i18next));

// routes
var indexRoutes = require('./routes/index');
var userRoutes = require('./routes/user');
var categoryRoutes = require('./routes/category');
var postRoutes = require('./routes/post');
var commentRoutes = require('./routes/comment');
var statsRoutes = require('./routes/stats');
var uploadRoutes = require('./routes/upload');
var rssRoutes = require('./routes/rss');
var sitemapRoutes = require('./routes/sitemap');
var chatRoutes = require('./routes/chat');
var apiRoutes = require('./routes/api.js');
// ======= 	//
// Routes 	//
// ======== //
app.use('/', indexRoutes);
app.use('/', userRoutes);
app.use('/categories', categoryRoutes);
app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);
app.use('/stats', statsRoutes);
app.use('/upload', uploadRoutes);
app.use('/rss', rssRoutes);
app.use('/sitemap.xml', sitemapRoutes);
app.use('/api', apiRoutes);
app.use('/chat', chatRoutes);
//testing


server.listen(port, () => console.log(`App is up on port ${port}`));


module.exports = {app};
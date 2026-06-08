require('dotenv').config();

const express = require("express");
const app = express();
let PORT = 8080;
const path = require('path');
const session = require ('express-session');
const MongoStore = require('connect-mongo').default;
const flash = require('express-flash');
const ExpressError = require('./utilities/ExpressError');

const { loadata } = require ('./Sample_Data/data');
const {isLoggedIn} = require('./middlewares');

const methodOverride = require('method-override');

const { User } = require('./models/users');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const { Item } = require('./models/items');

const items = require('./routers/items');
const claims = require('./routers/claims');
const users = require('./routers/users');

app.set('view engine','ejs');
let Engine = require('ejs-mate');
app.engine('ejs',Engine);
app.set('public',path.join('__dirname','public'));

const mongoose = require('mongoose');
async function main () {
    await mongoose.connect(`${process.env.MONGO_URL}`);
}
main()
    .then (
        ()=>{
            console.log("connected to DB");
        }
    )
    .catch ((err)=>{
        console.log (err);
    });

let store = MongoStore.create({
    mongoUrl: process.env.MONGO_URL,
    touchAfter: 24 * 3600,
});
const sessionOptions = {
    secret: process.env.SESSION_SECRET,
    store: store,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now()+7*24*60*60*1000,
        maxAge: 7*24*60*60*1000,
        httpOnly: true,
    }
};
app.use(flash());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(session(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
            const user = await User.findOne({ username: username });
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            const isValid = await user.isValidPassword(password);
            if (!isValid) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }
));
app.use((req,res,next)=>{
    res.locals.success = req.flash('success');
    if (res.locals.success.length) {
        console.log (res.locals.success[0]);
    }
    res.locals.error = req.flash('error');
    if (res.locals.error.length) {
        console.log (res.locals.error[0]);
    }
    if(req.user) {
        res.locals.CurrUser = req.user;
    }
    else {
        res.locals.CurrUser = null;
    }
    next();
});

app.use('/items',items);
app.use('/items/:id',claims);
app.use('/',users);

passport.serializeUser((user, done) => {
    done(null, user.id);
});
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});

/* Index */
app.get('/', (req,res)=>{
    res.redirect('/items');
});

/* Reporter (Admin) Page */
app.get ('/dashboard', isLoggedIn, async (req,res)=>{
    let items = await Item.find({reporter: req.user._id});
    res.render('index', {items, owner: true});
});

app.get ('/sample', (req,res)=>{
    loadata();
});

app.use ((req,res,next)=>{
    next(new ExpressError(404,"Page Not Found"));
});

app.use ((err,req,res,next)=>{
    let {status=500,message="something went wrong"} = err;
    res.status(status).render('error.ejs',{err});
});

app.listen(PORT,()=>{
    console.log(`Listening at  ${PORT}`);
});
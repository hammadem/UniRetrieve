const { Item } = require('./models/items');

let isLoggedIn = (req,res,next)=>{
    if (!req.user) {
        req.session.path = req.originalUrl;
        req.flash ('error','you must be logged in to perform this action');
        res.redirect('/login');
    }
    else {
        next();
    }
}

let redirectUrl = (req,res,next)=>{
    res.locals.path = req.session.path;
    next();
}

let logInRedirect = (req,res,next)=>{
    req.flash('success','Welcome Back !');
    if (res.locals.path) {
        res.redirect(res.locals.path);
    }
    else {
        res.redirect('/items');
    }
}

let isReporter = async (req,res,next)=>{
    let {id} = req.params;
    let item = await Item.findById(id);
    if (String(item.reporter)==String(res.locals.CurrUser._id)) {
        next();
    }
    else {
        res.redirect(`/items/${id}`);
    }
}

let isNotReporter = async(req,res,next)=>{
    let {id} = req.params;
    let item = await Item.findById(id);
    if (String(item.reporter)!=String(res.locals.CurrUser._id)) {
        next();
    }
    else {
        res.redirect(`/items/${id}`);
    }
}

module.exports = {isLoggedIn,redirectUrl,logInRedirect,isReporter,isNotReporter}
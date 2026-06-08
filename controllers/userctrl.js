let SignupRender = (req,res)=>{
    res.render('signup');
}

let CreateUser = async(req,res,next)=>{
    let {username, email, password} = req.body;

    let user = new User({username, email, password});
    await user.save();

    req.login(user, (err) => {
        if (err) next(err);
        req.flash ('success','Welcome to UniRetrive !');
        res.redirect('/dashboard');
    });
}

let LoginRender = (req,res)=>{
    res.render('login');
}

let Logout = async(req,res,next)=>{
    req.logout((err)=> {
        if (err)
            {
                return next(err);
            }
    req.flash('success',"You are logged out !");
    res.redirect('/items');
    });
}

module.exports = { SignupRender, CreateUser, LoginRender, Logout }
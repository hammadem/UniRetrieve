function WrapAsync(fn) {
    return async function(req,res,next) {
        fn()
        .catch((err)=>{
            next(err);
        });
    }
}

module.exports = WrapAsync;
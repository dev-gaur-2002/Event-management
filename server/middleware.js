const isLoggedIn = async (req,res,next)=>{
    if(req.session.user){
        return next()
    }
    else{
        res.redirect('/api/login')
    }
}

module.exports = {isLoggedIn}
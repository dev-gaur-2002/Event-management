const userModel = require('./userModel')

const createNewUser = async (req,res)=>{
    const {name,userName ,email,mobileNumber,password,confirmPassword} = req.body
    const user = {
        name,
        userName,
        email,
        mobileNumber,
        password
    }

    if(password != confirmPassword){
        res.status(400).json({
            success:false,
            message: "password did not matched"
        })
    }

    const userObj = await userModel.create(user)
    res.status(201).json({
        success:true,
        userObj
    })
}

const loginUser = async (req,res)=>{
    const {userName , password}  = req.body
    const user = await userModel.findOne({userName})
    console.log(user)
    if(!user){
        return res.status(400).json({
            success:false
        })
    }
    const isPasswordMatched = await user.comparePassword(password)
    if(!isPasswordMatched){
        res.status(400).json({
            success:false,
            error: "Password does not match , please try again later !!"
        })
    }

    const userSession = req.session
    userSession.user = user
    res.status(200).json({
        success:true,
        user
    })
}

const logoutUser = async (req,res)=>{
    // const user = await userModel.findOne({userName:req.session.user.userName})
    req.session.destroy()

    res.status(200).json({
        success:true,
        msg:"user logged out successfully"
    })
}

const addEvent = async (req,res)=>{
    const user = await userModel.findOne({userName:req.session.user.userName})
    if(!user){
        return res.status(500).json({
            success:false,
            msg:"user with this userName does not exists"
        })
    }
    
    const {name,date} = req.body
    user.events.push({
        name,
        date
    })

    await user.save()

    res.status(200).json({
        successs:true,
        events: user.events
    })  
}


module.exports = {
    createNewUser,
    loginUser,
    logoutUser,
    addEvent
}
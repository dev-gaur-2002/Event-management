const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    userName:{
        type:String,
        unique:true,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true,
    },
    mobileNumber:{
        type:Number,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    token:{
        type:String
    },
    events:[
        {
            name:{
                type:String,
                required:true
            },
            date:{
                type: Date,
                // required:true,
                default: new Date(Date.now())
            }
        }
    ],
    
},{timestamps:true})

UserSchema.pre('save' , async function(){
    this.password = await bcrypt.hash(this.password , 10)
})

UserSchema.methods.comparePassword = async function(password){
    try {

        return await bcrypt.compare(password, this.password);  
    
    } catch (error) {
    
        console.log(error)  
    
    }
}
    
module.exports = mongoose.model('user', UserSchema)
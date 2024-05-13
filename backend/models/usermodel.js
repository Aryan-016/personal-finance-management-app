const mongoose=require('mongoose')

const userschema=new mongoose.Schema({
    first_name:
    {
        type:String,
        required:[true,'first name is required']
    },

    last_name:
    {
        type:String,
        required:[true,'last name is required']
    },
    email:
    {
        type:String,
        required:[true,'email is required'],
        unique:true
    },
    password:
    {
        type:String,
        required:[true,'password is required']
    },
    dob:
    {
        type:String,
        required:[true,'dob is required']
    }
},
    {timestamps:true}
)


const usermodel=mongoose.model('users',userschema)

module.exports=usermodel
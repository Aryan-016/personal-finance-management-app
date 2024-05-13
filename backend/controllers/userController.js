const user_model = require('../models/usermodel')

const loginController = async (req, res) => {
    try {
        const {email,password}=req.body
    user_model.findOne({email:email}).then(user=>{
        if(user)
        {
            if(user.password===password)
            {
                res.json({
                    success: true,
                    user,
                  })
            }
            else
            {
                res.json("password is incorrect")
            }
        }
        else{
            res.json("user not exist")
        }
    })
    }
    catch (err) {
        res.status(400).json({ success: false, err })
    }
}

const registerController = (req, res) => {
    try {
        const vemail=req.body.email
    user_model.findOne({email:vemail}).then(user=>{
        console.log(user)
        if(user)
        {
            res.json("user exist")

        }
        else{
            user_model.create(req.body).then(user=>res.json(user)).catch(err=>res.json(err))
            
        }
        })
    }
    catch (err) {
        res.status(400).json({ success: false, err })
    }
}


module.exports = { loginController, registerController }
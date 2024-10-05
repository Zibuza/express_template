import mongoose from "mongoose"
import bcrypt from "bcrypt"

const User = mongoose.model("User")

async function register(req,res){
    

    try{
        const {name, email, password, role} = req.body.user
        const exits = await User.findOne({ email:email })

        if(exits){
            return res.status(403).json({msg: "User already registered"})
            
        }
        let hashedPass = await bcrypt.hash(password, 10)
        
        const newUser = new User({
            name,
            email,
            password: hashedPass,
            role
        })
        await newUser.save()
        res.status(201).json({msg: "User Registared"})

    }catch(err){
        console.error("Error while adding user" , err)
        res.status(500).json({msg: "Internal Server Errros"})
    }

}

export default{
    register
}
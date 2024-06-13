import userModel from "../models/userModel.js";
export const registerController= async (req,res,next)=>{
    try {
        const {name,email,password}= req.body
        if(!name){
            next("name is required");
        }if(!email){
            next("email is required");
        }if(!password){
            next("password is required");
        }
        const existingUser = await userModel.findOne({email})
        if (existingUser){
            next("Email already Registerd. Please Login");
        }
        const user = await userModel.create({name,email,password})
        const token = user.createJWT()
        res.status(201).send({
            success:true,
            message:'User created Successfully',
            user:{
                name:user.name,
                lastName:user.lastname,
                email:user.email,     
                location:user.location,
            },
            token,
        })
    } catch (error) {
        next(error);
    }
};

export const loginController = async (req,res,next) => {
    const {email,password} = req.body
    if(!email || !password){
        next('Please provide all fields')
    }
    const user = await userModel.findOne({email}).select("+password")
    if(!user){
        next('Invalid email or password')
    }
    const isMatch = await user.comparePassword(password)
    if(!isMatch){
        next('Invalid email or password')
    }
    user.password = undefined;
    const token = user.createJWT()
    res.status(200).json({
        success:true,
        message:'User Logged in Successfully',
        user,
        token,
    })
};

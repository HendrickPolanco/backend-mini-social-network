


const { PrismaClient } = require("@prisma/client");


const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


require("dotenv").config();

const prisma = new PrismaClient();

async function logIn(req, res) {
    
   try {
    const {email, password} = req.body

    if(!email || !password){
        return res.status(400).json({error: "fill the fields"})
    }
    const user = await prisma.user.findUnique({
        where:{email}
    })
    if(!user){
        return res.status(404).json({error: "user no found"})
    }
    const isPassowrd = await bcrypt.compare(password, user.password)

    const tokenAccess = jwt.sign(
        {userID: user.id, role: user.role},
        process.env.JWT_SECRET,
        {expiresIn: "1d"}
    )

    const tokenRefresh = jwt.sign(
        {userID:user.id, role: user.role},
        process.env.JWT_REFRESH_SECRET,
        {expiresIn: "7d"}
    )
        res.cookie("tokenRefresh", tokenRefresh, {
            httpOnly: true,
            secure:false,
            sameSite: "strict"
        })
    return res.status(201).json(
        {"tokenAccess": tokenAccess,
            
    })
   } catch (error) {
        return res.status(500).json({error: error.message})
   }
}

module.exports = logIn
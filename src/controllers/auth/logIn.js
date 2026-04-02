

// const { PrismaClient } = require("@prisma/client");
// // const { config } = require("dotenv");

// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt")
// require("dotenv").config();

// const prisma = new PrismaClient();

// async function logIn(req, res) {
    
//     try {
//         const { email, password} = req.body
        
//             const user = await prisma.user.findFirst({
//             where:{
//                 email,
               
//             }
            
//             }) 

//             if (!user) {
//                 return res.status(400).json({
//                   error: "Invalid credentials"
//                 });
//               }

//         const isPassowrd = await bcrypt.compare(password, user.password)
//         if(!email || !isPassowrd){ return res.status(400).json({
//             error: "Invalid credentials"
//           }) }

//         const token = jwt.sign(
//             { userID: user.id},
//              process.env.JWT_SECRET,
//              {expiresIn: "7d"}
//          )
//         return res.status(200).json(
//           { message:"login successful", 
//             token})
       
//     } catch (error) {
//         return res.status(500).json({error: error.message})
//     }
// }

// module.exports = logIn;

const { PrismaClient } = require("@prisma/client");


const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { use } = require("../../router/router");
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
    const isPassowrd = bcrypt.compare(password, user.password)

    const token = jwt.sign(
        {userID: user.id},
        process.env.JWT_SECRET,
        {expiresIn: "7d"}
    )

    return res.status(201).json({"token": token})
   } catch (error) {
        return res.status(500).json({error: error.message})
   }
}

module.exports = logIn
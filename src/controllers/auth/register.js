// const { PrismaClient } = require("@prisma/client");
// const bcrypt = require("bcrypt")
// const prisma = new PrismaClient();




// async function register(req, res) {
//       try {
//         const {name,lastname ,email, password} = req.body
//         const hashedPassword = await bcrypt.hash(password, 10)
//     const createrNewUser = await prisma.user.create({
//        data: {
//         name,
//         lastname,
//         email,
//         password: hashedPassword,
//        }
     
//     })
//     res.status(201).json(createrNewUser)
//       } catch (error) {
//         res.status(500).json({error: error.message})
//       }

   
// }

// module.exports = register;
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const bcrypt = require("bcrypt");


async function register(req, res) {
    
  
    try {
        const {name, lastname, email, password} = req.body
        if(!name || !lastname || !email || !password) {
            return console.log("fill all the fields");
        }
        const passwordhashed = await bcrypt.hash(password, 10)
        const user = await prisma.user.create({
            data:{
                name,
                lastname,
                email, 
                password: passwordhashed
            }

            
        })
        return res.status(201).json(user)

    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

module.exports = register;
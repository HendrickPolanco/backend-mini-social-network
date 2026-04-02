const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();


async function posts(req, res) {
   
    try {
        const {title, description, authorID} = req.body;

        if(!title  || !description || !authorID){
         return res.status(201).json({error: "fill all the fields"});
        }
     
        const posts = await prisma.post.create({
         data:{
             title,
             description,
             authorID,
         }
     })

     return res.status(201).json(posts)
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

module.exports = posts;
const { PrismaClient } = require("@prisma/client");



const prisma = new PrismaClient();


async function comments(req, res) {

       

    try {
        const {content,postID, authorID} = req.body;
        
        if(!content || !postID || !authorID){
            return res.status(400).json({error: "fill all the fields"})
        }

        const newComments = await prisma.comments.create({
            data:{
                content,
                postID,
                authorID,
    
            }
        })  
        return res.status(201).json(newComments)
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

module.exports = comments;
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();


async function getPostByAuthorID(req, res) {

    const id = Number(req.params.id)
    try {
        const postsData = await prisma.post.findFirst({
            where:{
                id:id
            },include:{
                author:{
                    select:{
                        name: true,
                         email:true
                        }}, comments:{
                            select:{
                                content:true,
                                author:{
                                    select:{
                                    name:true,
                                    email:true
                                }}
                            }
                        }
                        
            }
            
        })

        return res.status(200).json(postsData)
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
    
}
module.exports = getPostByAuthorID;

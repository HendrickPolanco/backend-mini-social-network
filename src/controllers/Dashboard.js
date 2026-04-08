const { PrismaClient } = require("@prisma/client");


const prisma = new PrismaClient();

async function dashboard(req, res) {
    
    const quatityUser = await prisma.user.count()
    const quatityPosts = await prisma.post.count()
    const quatityComments = await prisma.comments.count()



    return res.status(200).json([
        "User Management",
                        {quatityUser: quatityUser,
                         quatityPosts: quatityPosts,
                          quatityComments: quatityComments
                        }
                        ])
}

module.exports = dashboard;







const jwt = require("jsonwebtoken")

async function refreshToken(req, res) {
    
    const {refreshToken} = req.body

    if(!refreshToken) return res.status(401).json({error: "no refresh token"})

        try {
            
            const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
            console.log("JWT_SECRET:", process.env.JWT_SECRET) 
            const newAccessToken = jwt.sign(
                {id: decoded.id},
                process.env.JWT_SECRET,
                {expiresIn: "15m"}
            )
                return res.status(200).json({accessToken: newAccessToken})

                  
        } catch (error) {
            console.log("ERROR REFRESH:", error.message)
            return res.status(403).json({error:"refresh token invalid or invalid expires"})
        }
}

module.exports = refreshToken
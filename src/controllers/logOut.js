


async function logOut(req, res) {
    

    res.clearCookie("refreshToken",{
        httpOnly:true,
        secure:false,
        sameSite:"strict"
    })

    return res.status(200).json({message: "logged out successfully"})
}

module.exports = logOut
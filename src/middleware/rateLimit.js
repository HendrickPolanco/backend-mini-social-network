const rateLimit = require("express-rate-limit")

const postLimiter = rateLimit({
    
        windowMs: 15 * 60 * 1000,
        max: 2,
        message: {error:"to many request"},
        standardHeaders:true,
        legacyHeaders: false
    
})

module.exports = postLimiter;
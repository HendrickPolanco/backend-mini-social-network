const jwt = require("jsonwebtoken")
// require("dotenv").config()

async function authToken(req, res, next) {
  
      try {
        // console.log(req.headers)
        //verificacion del token
        // verificar que en el header esta la restricion autoriza
        // del token
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
       
        console.log("token:", token) // ← ¿qué imprime?
       
        if (!token) return res.status(401).json({ error: "No token provided" })
       
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
        req.user = decoded
        //verificar que el token es correcto 
        next()
      } catch (error) {
        return res.status(401).json({ error: "Invalid credentials" })
      }
}


module.exports = authToken












// console.log("HEADERS:", req.headers)
// console.log("AUTH HEADER:", req.headers.authorization)
// //guardar el header auth
// const authHeaders = req.headers.authorization
// if (!authHeaders) {
// return res.status(401).json({
//     error: "No token provided"
// });
// }
// const token = authHeaders.split(' ')[1]
// //armacenar el token
// if (!token) {
// return res.status(401).json({
//     error: "Invalid token format"
// });}
// try {

//  const decoded = jwt.verify(token, process.env.JWT_SECRET)
//  //verificar el token
//  //
//  req.user = decoded
//  next()
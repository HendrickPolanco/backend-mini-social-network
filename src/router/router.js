const express = require("express");
const register = require("../controllers/auth/register");
const logIn = require("../controllers/auth/logIn");
const comments = require("../controllers/post/user.Comments");
const posts = require("../controllers/post/userPost");
const getPostByAuthorID = require("../controllers/getPostByAuthorID");
const authToken = require("../middleware/authToken");
const refreshToken = require("../middleware/refreshAuthToken");
const logOut = require("../controllers/logOut");
const dashboard = require("../controllers/Dashboard");
const authAdmin = require("../middleware/authAdmin");
const postLimiter = require("../middleware/rateLimit");



const router = express.Router()

router.post("/register", register)
router.post("/posts",posts)
router.post("/comments", comments)

router.post("/refresh", refreshToken)
router.post("/login",logIn)
router.post("/logout", logOut)
router.get("/getposts/:id",authToken,postLimiter, getPostByAuthorID)
router.get("/admin", authAdmin,dashboard)


module.exports = router;  
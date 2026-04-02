const express = require("express");
const register = require("../controllers/auth/register");
const logIn = require("../controllers/auth/logIn");
const comments = require("../controllers/post/user.Comments");
const posts = require("../controllers/post/userPost");
const getPostByAuthorID = require("../controllers/getPostByAuthorID");
const authToken = require("../middleware/authToken");



const router = express.Router()

router.post("/register", register)
router.post("/posts",posts)
router.post("/comments", comments)

router.post("/login",logIn)
router.get("/getposts/:id",authToken, getPostByAuthorID)


module.exports = router;  
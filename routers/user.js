const express = require("express")
const router = express.Router()
const UserController = require("../Controllers/user.js")
const session = require('express-session')

router.use(session({
    secret: 'secrett',
    // resave: false,
    // saveUninitialized: true,
    // cookie:{
    //     secure:true,
    //     sameSite:true
    // }
}))

router.get('/register',UserController.registerFrom)
router.post('/register',UserController.postRegister)
router.get('/login',UserController.loginfrom)
router.post('/login',UserController.postLogin)

router.use(function(req, res, next) {
    // console.log(req.session);
    // if(!req.session.userId) {
    //     const error = 'please login first'
    //     res.redirect(`login?error=${error}`)
    // } else {
    //     next()
    // }
    // console.log('Time:', Date.now())
    next()
})
router.get('/',UserController.homepage)
router.get('/user/logout', UserController.logout)


module.exports = router
const {User, Profile, CashFlow} = require("../models/index.js")
const helper = require("../helpers/index")
const {Op} = require("sequelize")
const bcrypt = require('bcryptjs')

class Controller {
    static loginfrom(req,res) {
        const {err} = req.query
        res.render('login',{err})
    }
    static registerFrom(req,res) {
        res.render('register')
    }
    static postRegister(req,res) {
        const {username,email,password,role} = req.body
        User.create({username,email,password,role})
        .then((result) => {
            res.redirect('/login')
        }).catch((err) => {
            res.send(err)
        });
    }
    static postLogin(req,res) {
        const { username, password} =  req.body
        User.findOne({ where :{ username } })
        .then(user => {
            if(user) {
                const isValidPassword = bcrypt.compareSync(password, user.password)
                // console.log(isValidPassword);
                if(isValidPassword) {
                    req.session.userId = user.id
                    return res.redirect('/')
                } else {
                    const error = "invalid username/password"
                    // console.log(error)
                    return res.redirect(`/login?error=${error}`)
                }
            } else {
                const error = "invalid username/password"
                return res.redirect(`login?error=${error}`)
            }
        }).catch((err) => {
            // console.log(err);
            res.send(err)
        });
    }
    static homepage(req,res) {
        res.render('homepage')
    }
    static logout(req,res) {
        res.session.destroy((err) => {
            if(err) {
                res.send(err)
            } else {
                res.redirect('/')
            }
        })
    }
}
module.exports = Controller
const {User, Profile, CashFlow} = require("../models/index.js")
const getBalance = require("../helpers/index")


class Controller{
    static transaction(req, res){
        CashFlow.findAll({
            include: Profile
        })
        .then((data)=>{
            console.log(data);
            res.render("transaction", {data})
        })
        
        .catch((err)=>{
            res.send(err)
        })
    }

    static addTransaction(req, res){
        CashFlow.findAll()
        .then((data)=>{
            console.log(data);
            res.render("addTransaction", {data})
        })
        .catch((err)=>{
            res.send(err)
        })
    }

    static postAddTransaction(req, res){
        const{amount, description, dateOfTransaction, typeOfTransaction} = req.body
        let balance;
        let dataProfile
        let dataCashFlow
        Profile.findOne({where: {id: 1}})
        .then((data) => {
            dataProfile = data
            return CashFlow.findAll({where: {ProfileId: 1}})
        })
        .then((data2) => {
            dataCashFlow = data2
            if (dataCashFlow.length < 1) {
                balance = getBalance(dataProfile.income, amount)
            } else {
                balance = dataCashFlow[dataCashFlow.length - 1].balance - amount
            }
            return CashFlow.create({amount, description, balance, dateOfTransaction, typeOfTransaction, ProfileId: 1})
        })
        .then(()=>{
            res.redirect("/cashflow")
        })
        .catch((err)=>{
            res.send(err)
        })
    }

    static editTransaction(req, res){
        let id = +req.params.id
        let data 
        CashFlow.findAll({where: {id}})

        .then((edit)=>{
            data = edit[0]
            res.render("editTransaction", {data})
        })
    }

    static postEditTransaction(req, res){
        let id = +req.params.id
        const{amount, description, dateOfTransaction, typeOfTransaction}= req.body
        CashFlow.update({amount, description, dateOfTransaction, typeOfTransaction},{where:{id}})   
        .then((update)=>{
            res.redirect("/cashflow")
        })
        .catch((err)=>{
            res.send(err)
        })
    
    }
    static delete(req, res){
        const id = +req.params.id
        CashFlow.destroy({where: {id}})
            .then((_)=>{
                res.redirect("/cashflow")
            })
            .catch((err)=>{
                res.send(err)
            })
    }
}

module.exports = Controller


const express = require("express")
const router = express.Router()
const Controller = require("../controllers/cashflow.js")

router.get("/cashflow", Controller.transaction)
router.get("/cashflow/add", Controller.addTransaction)
router.post("/cashflow/add", Controller.postAddTransaction)
router.get("/cashflow/:id/edit", Controller.editTransaction)
router.post("/cashflow/:id/edit", Controller.postEditTransaction)
router.get("/cashflow/:id/delete", Controller.delete)





module.exports = router
const express = require("express")
const app = express()
const port = 3000
const routerUser = require("./routers/user")
const routerProfile = require("./routers/profile")
const routerCashFlow = require("./routers/cashflow")



app.set("view engine", "ejs")
app.use(express.urlencoded({extended:false}));

app.use("/",routerUser)
app.use("/",routerProfile)
app.use("/",routerCashFlow)


app.listen(port, ()=>{
    console.log(`this is ${port}`);
})

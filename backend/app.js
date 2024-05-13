const { addExpense, getExpense, deleteExpense } = require('./controllers/expense');
const { addIncome, getIncomes, deleteIncome } = require('./controllers/income');

const {loginController,registerController} = require('./controllers/userController')
// const {getAllTransaction,addTransaction} = require('./controllers/transactionController')

const express = require('express')
const cors = require('cors');
const { db } = require('./db/db');
const {readdirSync} = require('fs')
const app = express()

require('dotenv').config()

const PORT =8080

//middlewares
app.use(express.json())
app.use(cors())

app.post('/add-expense', addExpense)
app.get('/get-expenses', getExpense)
app.delete('/delete-expense/:id', deleteExpense)

//routes
// readdirSync('./routes').map((route) => app.use('/', require('./routes/' + route)))

app.post('/add-income', addIncome)
app.get('/get-incomes', getIncomes)
app.delete('/delete-income/:id', deleteIncome)


//login
app.post('/login',loginController)
//register
app.post('/register',registerController)

const server = () => {
    db()
    app.listen(PORT, () => {
        console.log('listening to port:', PORT)
    })
}

server()
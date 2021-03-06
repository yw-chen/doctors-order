const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const db = require('./db')
const patientRouter = require('./routes/patient-router')
const orderRouter = require('./routes/order-router')
const tableRouter = require('./routes/table-router')

const app = express()
const apiPort = 3000

app.use(bodyParser.urlencoded({extended:true}))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/',(req,res) => {res.send('Server is running!')})

app.use('/api',patientRouter)
app.use('/api',orderRouter)
app.use('/api',tableRouter)

app.listen(apiPort, () => console.log('Server running on port ${apiPort}'))
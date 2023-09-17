require('dotenv').config();

const express = require('express')
const mongoose = require('mongoose');

const app = express()
const port = 3000

mongoose.connect(
    process.env.MONGODB_URI,
    { useNewUrlParser: true }
)

const authRoute = require('./routes/auth')

app.use('/api/user', authRoute)


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
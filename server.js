require('dotenv').config()
const express = require('express')
const fs = require('fs')
const path = require('path')
const expressLayouts = require('express-ejs-layouts')
const cors = require('cors')
const app = express()
const port = process.env.APP_PORT || 3000
const redis = require('./database/redis')
const mongoose = require("./database/mongoose")

app.disable('etag')

app.set('view engine', 'ejs')

app.use(expressLayouts)

app.set('views', path.join(__dirname, 'views'))

app.set('layout', './layouts/master')

app.use(cors())

app.use(express.static('public'))

redis.connect()

mongoose.connect()

app.listen(port, () => {
    const currentDate = new Date().toLocaleString('vi-VN', {
        timeZone: 'Asia/Ho_Chi_Minh'
    });
    console.log(`⚡ [+] Time: ${currentDate}`);
    console.log(`⚡ [+] NodeJS app running at localhost:${port}`)
})

app.get('/', (req, res) => {
    return res.render('home/index')
})

app.get('/login', (req, res) => {
    return res.render('auth/login', { layout: false })
})

app.get('/register', (req, res) => {
    return res.render('auth/register', { layout: false })
})

const mail = require('./helpers/mail')
const logger = require('./helpers/logger')

let i = 1;

for (let i = 0; i < 20; i++) {
    console.log("SEND", i);
    mail().catch(err => {
        logger.error(err)
    })
}

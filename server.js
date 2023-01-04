require('dotenv').config()
const express = require('express')
const logger = require('morgan')
const fs = require('fs')
const path = require('path')
const expressLayouts = require('express-ejs-layouts');
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

app.use(logger('combined', {
    stream: fs.createWriteStream('./logs/access.log', { flags: 'a' })
}))

redis.connect()

mongoose.connect()

app.listen(port, () => {
    const nDate = new Date().toLocaleString('vi-VN', {
        timeZone: 'Asia/Ho_Chi_Minh'
    });
    console.log(`⚡ [+] Time: ${nDate}`);
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
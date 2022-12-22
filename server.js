require('dotenv').config()
const express = require('express')
const logger = require('morgan')
const fs = require('fs')

const redis = require('./database/redis')
const mongoose = require("./database/mongoose")

const app = express()
const port = process.env.APP_PORT || 3000

app.use(express.static('public'))

app.use(logger('combined', {
    stream: fs.createWriteStream('./logs/access.log', { flags: 'a' })
}))

app.use(logger('dev'))

redis.connect()

mongoose.connect()

app.listen(port, () => {
    console.log(`[+] NodeJS app running at localhost: ${port}!`)
})
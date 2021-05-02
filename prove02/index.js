const express = require('express')
const bodyParser = require('body-parser')
const path = require("path")

const app = express()
const prove02 = require("./routes/index")

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))

app.use(prove02)

app.listen(3000)

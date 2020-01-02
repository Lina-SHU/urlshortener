const express = require('express')
const exhbs = require('express-handlebars')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const urlShorten = require('./urlshorten')
const port = 3000

app.engine('handlebars', exhbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect('mongodb://localhost/urlshorten', { useUnifiedTopology: true, useNewUrlParser: true })
const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

const Urlshorten = require('./models/urlshorten')

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  const shortener = urlShorten(req.body)
  res.render('index', { shortener: shortener })
})

app.listen(port, () => {
  console.log(`Express app listening on port ${port}.`)
})
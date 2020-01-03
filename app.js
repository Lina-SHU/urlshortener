const express = require('express')
const exhbs = require('express-handlebars')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const urlShorten = require('./urlshorten')
const Urlshorten = require('./models/urlshorten')
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

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  //判斷輸入的url是否為空
  if (req.body.urlshorten) {
    const shortener = urlShorten(req.body)
    const url_shorten = new Urlshorten({
      url_origin: req.body.urlshorten,
      url_shorten: shortener
    })
    // 存入資料庫
    url_shorten.save(err => {
      if (err) return console.error(err)
      res.render('index', { shortener: shortener })
    })
  } else {
    //若為空則提醒使用者須先輸入url
    const warning = '請先輸入要縮短的URL網址'
    res.render('index', { warning: warning })
  }

})

app.listen(port, () => {
  console.log(`Express app listening on port ${port}.`)
})
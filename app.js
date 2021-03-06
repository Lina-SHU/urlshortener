const express = require('express')
const exhbs = require('express-handlebars')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const urlShorten = require('./urlshorten')
const Urlshorten = require('./models/urlshorten')
const clipboard = require('clipboard')
const port = 3000

app.engine('handlebars', exhbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(bodyParser.urlencoded({ extended: true }))

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/urlshorten', {
  useUnifiedTopology: true, useNewUrlParser: true,
  useCreateIndex: true
})
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
  if (req.body.originURL) {
    //產生短網址
    const shortener = urlShorten(req.body)
    //判斷是否有產生過的這組短網址
    Urlshorten.findOne({ url_shorten: shortener }, (err, url) => {
      if (err) return console.error(err)

      if (url) {
        //如果產生過，則重新執行該post指令
        return res.redirect(307, '/');
      } else {
        //如果沒有產生過，則將原網址跟短網址存入資料庫
        const url_shorten = new Urlshorten({
          url_origin: req.body.originURL,
          url_shorten: shortener
        })
        url_shorten.save(err => {
          if (err) return console.error(err)
          //儲存後，回給使用者短網址
          return res.render('index', { shortener: `http://localhost:3000/${shortener}` })
        })
      }
    })
  } else {
    //若為空則提醒使用者須先輸入url
    const warning = '請先輸入要縮短的URL網址'
    return res.render('index', { warning: warning })
  }
})

app.get('/:id', (req, res) => {
  //turn to the url webpage
  Urlshorten.findOne({ url_shorten: req.params.id }, (err, url) => {
    if (err) return console.error(err)

    if (url) {
      return res.redirect(url.url_origin)
    } else {
      const warning = '該短網址未存在'
      return res.render('index', { warning: warning })
    }
  })
})

app.listen(process.env.PORT || port, () => {
  console.log(`Express app listening on port ${port}.`)
})
const express = require('express')
const mongoose = require('mongoose')
const UrlShort = require('./server/UrlShort')
const app = express()

mongoose.connect('mongodb://localhost/urlShortener', {
  useNewUrlParser: true, useUnifiedTopology: true
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))

app.get('/', async (req, res) => {
  const UrlShorted = await UrlShort.find()
  res.render('index', { UrlShorted: UrlShorted })
})

app.post('/shortUrls', async (req, res) => {
  await UrlShort.create({ full: req.body.fullUrl })
  res.redirect('/')
})

app.get('/:shortUrl', async (req, res) => {
  const UrlShorted = await UrlShort.findOne({ short: req.params.shortUrl })
  if (UrlShorted == null) return res.sendStatus(404)
  UrlShorted.save()
  res.redirect(UrlShorted.full)
})

app.listen(process.env.PORT || 3000);
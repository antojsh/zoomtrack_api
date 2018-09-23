'use strict'

const express = require('express')
const tagCtrl = require('../controllers/tag')
const newsCtrl = require('../controllers/news')
const userCtrl = require('../controllers/user')
const auth = require('../middlewares/auth')
const api = express.Router()

api.get('/tag', auth, tagCtrl.getTags)
api.get('/tag/:tagId', tagCtrl.getTag)
api.post('/tag', auth, tagCtrl.saveTag)
api.put('/tag/:tagId', auth, tagCtrl.updateTag)
api.delete('/tag/:tagId', auth, tagCtrl.deleteTag)


api.get('/news', auth, newsCtrl.getAllNews)
api.get('/news/:newsId', newsCtrl.getNews)
api.post('/news', auth, newsCtrl.saveNews)
api.put('/news/:newsId', auth, newsCtrl.updateNews)
api.delete('/news/:newsId', auth, newsCtrl.deleteNews)


api.post('/signup', userCtrl.signUp)
api.post('/signin', userCtrl.signIn)
api.get('/private', auth, (req, res) => {
  res.status(200).send({
    message: 'Tienes acceso'
  })
})

module.exports = api
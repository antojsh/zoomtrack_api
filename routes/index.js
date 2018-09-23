'use strict'

const express = require('express')
const tagCtrl = require('../controllers/tag')
const userCtrl = require('../controllers/user')
const auth = require('../middlewares/auth')
const api = express.Router()

api.get('/tag', auth, tagCtrl.getTags)
api.get('/tag/:tagId', tagCtrl.getTag)
api.post('/tag', auth, tagCtrl.saveTag)
api.put('/tag/:tagId', auth, tagCtrl.updateTag)
api.delete('/tag/:tagId', auth, tagCtrl.deleteTag)


api.post('/signup', userCtrl.signUp)
api.post('/signin', userCtrl.signIn)
api.get('/private', auth, (req, res) => {
  res.status(200).send({
    message: 'Tienes acceso'
  })
})

module.exports = api
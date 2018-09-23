'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TagSchema = Schema({
    name: {
        type: String,
        require: true
    },
})

module.exports = mongoose.model('Tag', TagSchema)
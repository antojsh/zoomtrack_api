'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NewsSchema = Schema({
    title: {
        type: String,
        require: true
    },
    body: {
        type: String,
        require: true
    },
    author: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    tags: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Tag'
    }]
})

module.exports = mongoose.model('News', NewsSchema)
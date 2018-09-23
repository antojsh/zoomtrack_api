'use strict'

const News = require('../models/news')

function getNews (req, res) {
  let newsId = req.params.newsId

  News.findById(newsId, (err, news) => {
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    if (!news) return res.status(404).send({message: `La noticia no existe`})

    res.status(200).send({ news })
  })
}

function getAllNews (req, res) {
    News.find({})
        .populate('tags')
        .populate('author')
        .exec( (err, news) => {
            if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
            if (!news) return res.status(404).send({message: 'No existen noticias'})

            res.status(200).json( news )
        })
}

function saveNews (req, res) {
  console.log('POST /api/news')
  console.log(req.body)

  let news = new News()
  news.title = req.body.title
  news.body = req.body.body
  news.author = req.user
  news.tags = req.body.tags

  news.save((err, newsStored) => {
    if (err) res.status(500).send({message: `Error al salvar en la base de datos: ${err} `})

    res.status(200).send({ news: newsStored })
  })
}

function updateNews (req, res) {
  let newsId = req.params.newsId
  let update = req.body

  News.findByIdAndUpdate(newsId, update, (err, newsUpdated) => {
    if (err) res.status(500).send({message: `Error al actualizar la noticia: ${err}`})

    res.status(200).send({ news: newsUpdated })
  })
}

function deleteNews (req, res) {
  let newsId = req.params.newsId

  News.findById(newsId, (err, news) => {
    if (err) res.status(500).send({message: `Error al consultar la noticia: ${err}`})

    news.remove(err => {
      if (err) res.status(500).send({message: `Error al borrar la noticia: ${err}`})
      res.status(200).send({message: 'la noticia ha sido eliminada'})
    })
  })
}

module.exports = {
  getNews,
  getAllNews,
  saveNews,
  updateNews,
  deleteNews
}
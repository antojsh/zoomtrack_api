'use strict'

const Tag = require('../models/tag')

function getTag (req, res) {
  let tagId = req.params.tagId

  Tag.findById(tagId, (err, tag) => {
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    if (!tag) return res.status(404).send({message: `El tag no existe`})

    res.status(200).send({ tag })
  })
}

function getTags (req, res) {
  Tag.find({}, (err, tags) => {
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    if (!tags) return res.status(404).send({message: 'No existen tags'})

    res.send(200, { tags })
  })
}

function saveTag (req, res) {
  console.log('POST /api/product')
  console.log(req.body)

  let product = new Tag()
  product.name = req.body.name
  product.picture = req.body.picture
  product.price = req.body.price
  product.category = req.body.category
  product.description = req.body.description

  product.save((err, tagStored) => {
    if (err) res.status(500).send({message: `Error al salvar en la base de datos: ${err} `})

    res.status(200).send({ tag: tagStored })
  })
}

function updateTag (req, res) {
  let tagId = req.params.tagId
  let update = req.body

  Tag.findByIdAndUpdate(tagId, update, (err, tagUpdated) => {
    if (err) res.status(500).send({message: `Error al actualizar el tag: ${err}`})

    res.status(200).send({ tag: tagUpdated })
  })
}

function deleteTag (req, res) {
  let tagId = req.params.tagId

  Tag.findById(tagId, (err, tag) => {
    if (err) res.status(500).send({message: `Error al consultar el tag: ${err}`})

    tag.remove(err => {
      if (err) res.status(500).send({message: `Error al borrar el tag: ${err}`})
      res.status(200).send({message: 'El tag ha sido eliminado'})
    })
  })
}

module.exports = {
  getTag,
  getTags,
  saveTag,
  updateTag,
  deleteTag
}
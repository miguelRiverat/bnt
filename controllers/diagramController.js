'use strict'

const model = require('../models/diagramModel');

let show = (req, res) => {

  let id = req.params.id
  let query = id 
    ? { id }
     : { }

  return model.find(query)
    .then(record => {
      console.log(record)
      return res.send(record)
    })
    .catch(err => res.send(err))
}

let findParams = (req, res) => {
  
  let name = req.query.name
  let query = {}
  
  if (name) { query.name = name }

  console.log(query)

  return model.find(query)
    .then(records => {
      console.log(records)
      return res.send(records)
    })
    .catch(err => res.send(err))
}

let update = (req, res) => {
  
  let id = req.params.id
  let { name, diagram } = req.body

  console.log (id, name, diagram)

  model.findOne({_id: id})
    .then(record => {
      console.log(record)
      if ( !record ) {
        return res.status(404).send({
          status: 'NOT OK',
          message: 'NO RECORD FOUND'
        })
      }
      record.name = name || record.name
      record.diagram = diagram || record.diagram
      record.save()
        .then(record => res.status(200).send(record))
    })
    .catch(err => res.status(500).send(err))
}

let store = (req, res) => {
  let { name, diagram } = req.body
  let diagramInstance = new model({
    name,
    diagram
  })

  diagramInstance.save(diagram)
    .then(record => {        
    res.status(200)
    return res.send(record)
  })
  .catch(err => res.status(500).send(err))
}

module.exports = {
  show,
  store,
  update,
  findParams
}
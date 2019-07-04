'use strict'

const model = require('../models/diagramModel');

let show = (req, res) => {

  let _id = req.params._id
  let query = _id 
    ? { _id: _id }
     : { }

  return model.find(query)
    .then(record => {
      return res.send(record)
    })
    .catch(err => res.send(err))
}

let findParams = (req, res) => {
  
  return model.find({})
    .then(records => {
      //let records_ = records.map(rec => rec.diagram)
      return res.send(records)
    })
    .catch(err => res.send(err))
}

let update = (req, res) => {
  
  let _id = req.params._id
  let { id, title, nodes, edges } = req.body

  model.findOne({_id: _id})
    .then(record => {
      if ( !record ) {
        return res.status(404).send({
          status: 'NOT OK',
          message: 'NO RECORD FOUND'
        })
      }
      record.id = id || record.id
      record.title = title || record.title
      record.edges = edges || record.edges
      record.nodes = nodes || record.nodes
      record.save()
        .then(record => res.status(200).send(record))
    })
    .catch(err => res.status(500).send(err))
}

let store = (req, res) => {
  let { id, title, nodes, edges } = req.body
  let diagramInstance = new model({
    id,
    title,
    nodes,
    edges
  })

  diagramInstance.save()
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
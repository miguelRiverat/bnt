'use strict'

const model = require('../models/diagramModel')
const Graph = require('node-dijkstra')

const injectDiagram = id => {
  if (!id) {
    return Promise.reject({
      status: 'NOT OK',
      message: 'NO RECORD FOUND'
    })
  }

  return model.findOne({_id: id})
    .then(record => {
      if ( !record ) {
        return Promise.reject({
          status: 'NOT OK',
          message: 'NO RECORD FOUND'
        })
      }
      return Promise.resolve(record)
    })
    .catch(err => Promise.reject(err))  
}

const matchModels = baseModel => {
  const route = new Graph()
  baseModel.nodes.forEach(element => {
    let innerJson = baseModel.edges.filter(edge =>  edge.source == element.id)
      .reduce((acum , currenteEdge) => {
        acum[currenteEdge.target.toString()] = 1
        return acum
      }, {})
    route.addNode(element.id.toString(), innerJson)
  })
  return route
}

let shortPath = (req, res) => {
  let id = req.params._id
  let { startNode, endNode } = req.body
  return injectDiagram(id)
    .then(record => {
      let route = matchModels(record.toObject())
      let result =  route.path(startNode, endNode, { cost: true })
      res.status(200).send(result)      
    })
    .catch(response => res.status(404).send(response))
}

module.exports = {
  shortPath
}
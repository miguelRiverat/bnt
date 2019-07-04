'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

let DiagramSchema = new Schema({
  id: Number,
  title: String,
  edges: [{}],
  nodes: [{}]
}, { versionKey: false })


module.exports = mongoose.model('Diagram', DiagramSchema)
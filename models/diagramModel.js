'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

let DiagramSchema = new Schema({
  diagram: Schema.Types.Mixed,  
  name: String
}, { versionKey: false })


module.exports = mongoose.model('Diagram', DiagramSchema)
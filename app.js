'use stric'

const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const diagram = require('./routes/routeDiagram')
const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

app.use('/diagrams', diagram)

mongoose.connect('mongodb+srv://miguel:miguel@cluster0-onvlw.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true })
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.listen(3000, () => {
  console.log('Servidon escuchando sobre el puerto ' + 3000)
})
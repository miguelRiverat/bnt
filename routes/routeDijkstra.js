'use strict'

const express = require('express')
const router = express.Router()

const controller = require('../controllers/dijkstraController')

router.post('/:_id', controller.shortPath)

module.exports = router
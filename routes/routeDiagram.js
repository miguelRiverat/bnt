'use strict'

const express = require('express')
const router = express.Router()

const controller = require('../controllers/diagramController')

router.get('/', controller.findParams)
router.get('/:id', controller.show)
router.put('/:id', controller.update)
router.post('/', controller.store)


module.exports = router
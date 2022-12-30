const express = require('express')
const router = express.Router()
const compController = require('../controllers/compController')

router.route('/')
    .get(compController.getAllComponents)
    .post(compController.createNewComponent)
    .patch(compController.updateComponent)
    .delete(compController.deleteComponent)

module.exports = router
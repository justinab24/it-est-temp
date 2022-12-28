const express = require('express')
const router = express.Router()
const adminController = require('../controllers/adminController')

router.route('/')
    .get(adminController.getAllComponents)
    .post(adminController.createNewComponent)
    .patch(adminController.updateComponent)
    .delete(adminController.deleteComponent)

module.exports = router
const express = require('express')
const router = express.Router()
const roleController = require('../controllers/roleController')

router.route('/')
    .get(roleController.getAllRoles)
    .post(roleController.createNewRole)
    .patch(roleController.updateRole)
    .delete(roleController.deleteRole)

module.exports = router
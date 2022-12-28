const Component = require('../models/Component')
const Role = require('../models/Role')
const asyncHandler = require('express-async-handler')

const getAllComponents = asynchandler (async (req, res) => {
    const components = await Component.find().lean()
    if(!components) {
        return res.status(400).json({message: "No components found"})
    }
    res.json(components)
})

const createNewComponent = asyncHandler (async (req, res) => {
    const { name, rate, lowval, medval, highval, vhighval } = req.body
    if (!name || !rate || !lowval || !medval || !highval || !vhighval) {
        return res.status(400).json({message: "All fields are required"})
    }

    const duplicate = await Component.findOne({name}).lean().exec()
    

})

const updateComponent = asyncHandler (async (req, res) => {

})

const deleteComponent = asyncHandler (async (req, res) => {

})

module.exports = {
    getAllComponents,
    createNewComponent,
    updateComponent,
    deleteComponent
}
const Component = require('../models/Component')
const asyncHandler = require('express-async-handler')

const getAllComponents = asyncHandler (async (req, res) => {
    const components = await Component.find().lean()
    if(!components?.length) {
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

    if(duplicate) {
        return res.status(409).json({message: "Duplicate component name"})
    }

    const componentObject = { name, rate, lowval, medval, highval, vhighval }

    const component = await Component.create(componentObject)

    if (component) {
        res.status(201).json({message: `New component ${name} created`})
    } else {
        res.status(400).json({message: "Invalid user data received"})
    }
    

})

const updateComponent = asyncHandler (async (req, res) => {
    const { id, name, rate, lowval, medval, highval, vhighval } = req.body
    if (!id || !name || !rate || !lowval || !medval || !highval || !vhighval) {
        return res.status(400).json({message: "All fields are required"})
    }

    const component = await Component.findById(id).exec()

    if(!component) {
        return res.status(400).json({message: "Component not found"})
    }

    const duplicate = await Component.findOne({name}).lean().exec()

    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({message: "Duplicate component name"})
    }

    component.name = name
    component.rate = rate
    component.lowval = lowval
    component.medval = medval
    component.highval = highval
    component.vhighval = vhighval

    const updatedComponent = await component.save()
    
    res.json({message: `${updatedComponent.name} updated`})

})

const deleteComponent = asyncHandler (async (req, res) => {
    const { id } = req.body
    
    if(!id) {
        return res.status(400).json({message: 'component id required'})
    }

    const component = await Component.findById(id).exec()

    if(!component) {
        return res.status(400).json({message: "Component not found"})
    }

    const result = await component.deleteOne()

    const reply = `Component ${result.name} with ID ${result._id} deleted`

    res.json(reply)

})

module.exports = {
    getAllComponents,
    createNewComponent,
    updateComponent,
    deleteComponent
}
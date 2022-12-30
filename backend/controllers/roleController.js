const Role = require('../models/Role')
const asyncHandler = require('express-async-handler')

const getAllRoles = asyncHandler (async (req, res) => {
    const roles = await Role.find().lean()
    if(!roles?.length) {
        return res.status(400).json({message: "No roles were found"})
    }
    res.json(roles)
})

const createNewRole = asyncHandler (async (req, res) => {
    const { name, rate } = req.body
    if (!name || !rate) {
        return res.status(400).json({message: "All fields are required"})
    }
    const duplicate = await Role.findOne({name}).lean().exec()

    if(duplicate) {
        return res.status(409).json({message: "Duplicate role name"})
    }

    const roleObject = { name, rate }
    
    const role = await Role.create(roleObject)

    if (role) {
        res.status(201).json({message: `New role ${name} created`})
    } else {
        res.status(400).json({message: "Invalid role data receiver"})
    }

})

const updateRole = asyncHandler (async (req, res) => {
    const { id, name, rate } = req.body
    if (!id || !name || !rate) {
        return res.status(400).json({message: "All fields are required"})
    }

    const role = await Role.findById(id).exec()

    if(!role) {
        return res.status(400).json({message: "Role not found"})

    }

    const duplicate = await Role.findOne({name}).lean().exec()

    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({message: "Duplicate role name"})
    }

    role.name = name
    role.rate = rate

    const updatedRole = await role.save()

    res.json({message: `${updatedRole.name} updated`})

})

const deleteRole = asyncHandler (async (req, res) => {
    const { id } = req.body

    if(!id) {
        return res.status(400).json({message: 'role id required'})
    }

    const role = await Role.findById(id).exec()

    if(!role) {
        return res.status(400).json({message: "Role not found"})
    }
    
    const result = await role.deleteOne()

    const reply =  `Role ${result.name} with ID ${result._id} deleted`

    res.json(reply)

})

module.exports = {
    getAllRoles,
    createNewRole,
    updateRole,
    deleteRole
}
const Entry = require('../models/Entry')
const asyncHandler = require('express-async-handler')

const getAllEntries = asyncHandler (async (req, res) => {
    const entries = await Entry.find().lean()
    if(!entries?.length) {
        return res.status(400).json({message: "No entries found"})
    }
    res.json(entries)
})

const createNewEntry = asyncHandler (async (req, res) => {
    const { comp, description, complexity, count, role, total } = req.body
    if (!comp|| !description || !complexity || !count || !role || !total) {
        return res.status(400).json({message: "All fields are required"})
    }

    const entryObject = { comp, description, complexity, count, role, total }

    const entry = await Entry.create(entryObject)

    if (entry) {
        res.status(201).json({message: `New entry added`})
    } else {
        res.status(400).json({message: "Invalid data received"})
    }
    
})

const updateEntry = asyncHandler (async (req, res) => {
    const { comp, description, complexity, count, role, total } = req.body
    if (!comp|| !description || !complexity || !count || !role || !total) {
        return res.status(400).json({message: "All fields are required"})
    }

    const entry = await Entry.findById(id).exec()

    if(!entry) {
        return res.status(400).json({message: "Entry not found"})
    }

    entry.comp = comp
    entry.description = description
    entry.complexity = complexity
    entry.count = count
    entry.role = role
    entry.total = total

    const updatedEntry = await entry.save()
    
    res.json({message: 'entry updated'})

})

const deleteEntry = asyncHandler (async (req, res) => {
    const { id } = req.body
    
    if(!id) {
        return res.status(400).json({message: 'entry id required'})
    }

    const entry = await Entry.findById(id).exec()

    if(!entry) {
        return res.status(400).json({message: "entry not found"})
    }

    const result = await entry.deleteOne()

    const reply = `entry with ID ${result._id} deleted`

    res.json(reply)

})

module.exports = {
    getAllEntries,
    createNewEntry,
    updateEntry,
    deleteEntry
}


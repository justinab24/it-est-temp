const mongoose = require('mongoose')

const entrySchema = new mongoose.Schema({
    comp : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Component'
    },
    description : {
        type: String,
        required: false

    },
    complexity : {
        type: String,
        required: false
    },
    count : {
        type: Number,
        required: true
    },
    role : {
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Role'
    },
    total : {
        type: mongoose.Types.Decimal128,
        required: true
    },
    totalTime : {
        type: Number,
        required : true
    }
})

module.exports = mongoose.model('Entry', entrySchema)
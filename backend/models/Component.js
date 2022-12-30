const mongoose = require('mongoose')

const compSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: true
    },
    rate: {
        type: mongoose.Types.Decimal128,
        required: true
    },
    lowval: {
        type: Number,
        required: true
    },
    medval: {
        type: Number,
        required: true
    },
    highval: {
        type: Number,
        required: true
    },
    vhighval: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Component', compSchema)
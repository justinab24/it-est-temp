const mongoose = require('mongoose')

const roleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rate: {
        type: mongoose.Types.Decimal128,
        required: true
    }
})

module.exports = mongoose.model('Role', roleSchema)
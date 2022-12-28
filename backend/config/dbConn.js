const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.EST_TEMP_DB_URI)
    } catch (err) {
        console.log(err)
    }
}

module.exports = connectDB
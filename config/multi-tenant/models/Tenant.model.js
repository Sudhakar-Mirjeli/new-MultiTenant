const mongoose = require('mongoose');


const tenantSchema = new mongoose.Schema({
    name: {
        type: String
    },
    domain: {
        type: String
    },
    dbURI: {
        type: String
    },
    status: {
        type: String,
        default:"ACTIVE",
        enum: ["ACTIVE", "INACTIVE"]
    }
}, { timestamps: true })

module.exports = tenantSchema
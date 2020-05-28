const mongoose = require('mongoose')

// Setup schema
const assetSchema = new mongoose.Schema({
    namePlate: {
        type: String,
        required: true
    },
    manufacturer: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    country:{
        type: String
    },
    documents:[{
        document: {
            type: Buffer
        },
        description: {
            type: String
        },
        type: {
            type: String
        }
    }],
    isAvailable: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

// Set asset public overview
assetSchema.methods.getPublicOverview = function () {
    const userObject = this.toObject()  // Convert the user from the DB to an copy object
    delete userObject.documents
    return userObject
}

// Create model
const Asset = mongoose.model('Asset', assetSchema)

module.exports = Asset
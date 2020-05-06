const express = require('express') // Express exposes just a single function
const cors = require('cors')

// Initialize application
const app = express()

// Setup cors
app.use(cors())

// Define static directory
app.use(express.static('public'))

// Automatically parse incoming json
app.use(express.json())

// Setup routers
app.use(require('./routers/asset-endpoint'))


module.exports = app
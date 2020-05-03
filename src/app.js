const express = require('express') // Express exposes just a single function


// Initialize application
const app = express()

// Define static directory
app.use(express.static('public'))

// Automatically parse incoming json
app.use(express.json())

// Setup routers
app.use(require('./routers/asset-endpoint'))


module.exports = app
const express = require('express') // Express exposes just a single function
const cors = require('cors')
const path = require('path')

// Setup absolute path for index.html
const indexFile= path.join(__dirname, '../public/index.html')




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

// Route for not matched URLs
app.get('*', (req, res) => {
    res.sendFile(indexFile)          
})


module.exports = app
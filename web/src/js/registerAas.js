import { syntaxHighlight } from './syntaxHighlight.js'

const registerAas = async (aas, cb) => {

    // Setup fetch options
    const url = '/api/aas'
    const options = {
        method: 'POST', 
        headers: {'Content-Type': 'application/json'},
        body: aas
    }

    try {
        // Fetch response
        const response = await fetch(url, options)

        // If the status response is not 'Created'
        if (response.status!==201) {
            cb()
        }

        // Fetch data
        const data = await response.json()

        // Stringify the data
        const dataJson = JSON.stringify(data, null, 3)

        // Callback data
        cb(dataJson)

    } catch (err) {
        cb()
    }

}




const textBox = document.querySelector('#aas-box')
const aasForm = document.querySelector('form')

// Run on button click
aasForm.addEventListener('submit', (e) => {
        
    // Prevent reloading
    e.preventDefault()

    // Get input text
    const inputText = document.querySelector('#new-aas').value

    // Register AAS
    registerAas(inputText, (data) => {
        if (data) {
            textBox.innerHTML = '<b>The following AAS was created:</b>\n' + syntaxHighlight(data)
        } else {
            textBox.innerHTML = '<b>No AAS created.</b>'
        }
    })
    
})
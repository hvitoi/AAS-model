import { fetchAas } from './fetchAas.js'
import { syntaxHighlight } from './syntaxHighlight.js'


const updateAas = async (uuid, aas, cb) => {

    // Setup fetch options
    const url = '/api/aas/' + uuid
    const options = {
        method: 'PATCH', 
        headers: {'Content-Type': 'application/json'},
        body: aas
    }
 
    
    try {
        // Fetch response
        const response = await fetch(url, options)
        console.log(response);
        

        // If the status response is not 'OK'
        if (response.status!==200) {
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







const uuidForm = document.querySelector('#uuid-form')
const inputBox = document.querySelector('input')

const aasForm = document.querySelector('#aas-form')
const textBox = document.querySelector('textarea')

const updateButton = document.querySelector('#update-button')

const resultBox = document.querySelector('#result-box')

// Disable the Update button by default
updateButton.disabled = true

// Run on button click
uuidForm.addEventListener('submit', (e) => {

    // Prevent reloading
    e.preventDefault()

    // Get input value
    const inputBoxValue = inputBox.value == '' ? '-' : inputBox.value
    console.log(inputBoxValue);
    
               
    // Fetch result onto textBox
    fetchAas(inputBoxValue, (data) => {
        if (data) {
            const dataUpdate = JSON.parse(data)
            
            delete dataUpdate._id
            delete dataUpdate.createdAt
            delete dataUpdate.updatedAt
            delete dataUpdate.__v
            
            // Print out the search result on the text area
            textBox.innerHTML = JSON.stringify(dataUpdate, null, 3)

            // Disable the UUID input, so that the user cannot change
            inputBox.disabled = true;

            // Enable Update button
            updateButton.disabled = false

        } else {
            textBox.innerHTML = 'No AAS found.'
        }
        
    })

})


// Run on update button click
aasForm.addEventListener('submit', (e) => {

    // Prevent reloading
    e.preventDefault()

    // Get input value
    const inputBoxValue = inputBox.value == '' ? '-' : inputBox.value

    // Get aas box value
    const textBoxValue = textBox.value
               
    // Update AAS
    updateAas(inputBoxValue, textBoxValue, (data) => {
        if (data) {
            resultBox.innerHTML = '<b>The following AAS was modified:</b>\n' + syntaxHighlight(data)
        } else {
            resultBox.innerHTML = '<b>No AAS modifed.</b>'
        }
    })

})
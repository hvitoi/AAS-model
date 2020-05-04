import { syntaxHighlight } from './syntaxHighlight.js'

const textBox = document.querySelector('#aas-box')
const aasForm = document.querySelector('form')

const deleteAas = async (uuid, cb) => {

    // Setup fetch options
    const url = '/aas/' + uuid
    const options = {method: 'DELETE'}
    

    try {
        // Fetch response
        const response = await fetch(url, options)

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


// Run on button click
aasForm.addEventListener('submit', (e) => {
        
    // Prevent reloading
    e.preventDefault()

    // Get input value
    const inputBox = document.querySelector('input').value

    // Delete AAS
    deleteAas(inputBox, (data) => {
        if (data) {
            textBox.innerHTML = '<b>The following AAS was sucessfully removed:</b>\n' + syntaxHighlight(data)
        } else {
            textBox.innerHTML = '<b>No AAS removed.</b>'
        }
    })
    
})
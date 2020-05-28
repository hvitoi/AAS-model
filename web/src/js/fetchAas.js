import { syntaxHighlight } from './syntaxHighlight.js'

const fetchAas = async (uuid, cb) => {

    // Check if the UUID was provided
    var url = uuid === undefined ? `nginx:8080/api/aas` : `/api/aas/${uuid}`
    
    // Setup fetch options
    const options = {method: 'GET'}

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





const textBox = document.querySelector('#aas-box')
const aasForm = document.querySelector('form')

// Run on load
fetchAas('', (data) => {
    textBox.innerHTML = '<b>Listing out all AASs:</b>\n' + syntaxHighlight(data)
})


// Run on button click
aasForm.addEventListener('submit', (e) => {

    // Prevent reloading
    e.preventDefault()

    // Get input value
    const inputBox = document.querySelector('input').value

    // Fetch results
    fetchAas(inputBox, (data) => {
        if (data) {
            textBox.innerHTML = '<b>Search results:</b>\n' + syntaxHighlight(data)
        } else {
            textBox.innerHTML = '<b>No AAS found for the provided UUID.</b>'
        }
        
    })

})


export { fetchAas }
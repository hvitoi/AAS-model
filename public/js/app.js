// CLIENT-SIDE JAVASCRIPT


// Associate variables with screen objects
const weatherForm = document.querySelector('form')  // The "form" to be associated is the first form created in the html file
const message1 = document.querySelector('#message1')        // .class or #id
const message2 = document.querySelector('#message2')        // # to search by id

// Add a event listener for the form
weatherForm.addEventListener('submit', (e) => {   // e stands for event
          
    // Prevents the broser to default refresh after button click
    e.preventDefault(); 

    // Message of Loading
    message1.textContent = 'Loading...'

    // Fetch input data
    const aasId = document.querySelector('input').value

    // Make url query
    url = `/aas/${aasId}`

    // Similar to request/curl
    // fetch(url).then(fn)
    fetch(url).then((response) => {
        response.json().then((data) => {       // data has the parsed data
            if (data.error) {   //if there is error
                message1.textContent = data.error            
            } else {
                message1.textContent = data
                
            }

        })
    })
    
})









const printDateInFooter = function () {
    // recupero un riferimento allo span vuoto nel footer
    const footerSpan = document.getElementById('year')
    footerSpan.innerText = new Date().getFullYear()
}

printDateInFooter()

const URLparameters = new URLSearchParams(location.search)
const eventId = URLparameters.get('id')

const eventsURL = "https://striveschool-api.herokuapp.com/api/product/";

const getDetails = function () {
    fetch(eventsURL + eventId, {
        method: 'GET',
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkMjQ2NjM4MzRiZjAwMTUwMDA2ZmUiLCJpYXQiOjE3NDI1NjE2OTEsImV4cCI6MTc0Mzc3MTI5MX0.h8E1vbYDfCB1CHPRXu85r9tP6fAJx58jPHJbKJdddek"
        }
    })
        .then((response) => {
            console.log('response', response)
            if (response.ok) {
                return response.json()
            } else {
                throw new Error('Errore nel recupero dei dettagli')
            }
        })
        .then((data) => {
            console.log('DETTAGLI', data)
            console.log('URL Immagine:', data.imageUrl);

            const imageUrl = document.getElementById('image')
            const name = document.getElementById('name')
            const description = document.getElementById('description')
            const price = document.getElementById('price')
            const brand = document.getElementById('brand')

            name.innerText = data.name
            description.innerText = data.description
            price.innerText = data.price + '€'
            brand.innerText = data.brand
            imageUrl.src = data.imageUrl
        })
        .catch((err) => {
            console.log('ERRORE NEL RECUPERO DATI', err)
        })
}

const editWine = function () {
    location.assign('./backoffice.html?id=' + eventId)
}

const deleteWine = function () {
    fetch(eventsURL + '/' + eventId, {
        method: 'DELETE',
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkMjQ2NjM4MzRiZjAwMTUwMDA2ZmUiLCJpYXQiOjE3NDI1NjE2OTEsImV4cCI6MTc0Mzc3MTI5MX0.h8E1vbYDfCB1CHPRXu85r9tP6fAJx58jPHJbKJdddek"
        }
    })
        .then((response) => {
            if (response.ok) {
                alert('VINO ELIMINATO')
                location.assign('./homepage.html')
            } else {
                throw new Error('Eliminazione NON andata a buon fine!')
            }
        })
        .catch((err) => {
            console.log('ERRORE NELLA CANCELLAZIONE', err)
        })
}

getDetails()


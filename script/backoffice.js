
const printDateInFooter = function () {
    // recupero un riferimento allo span vuoto nel footer
    const footerSpan = document.getElementById('year')
    footerSpan.innerText = new Date().getFullYear()
}

printDateInFooter()

class Wine {
    constructor(_image, _name, _description, _price, _brand) {
        {
            this.imageUrl = _image
            this.name = _name
            this.description = _description
            this.price = _price
            this.brand = _brand
        }
    }
}

const URLparameters = new URLSearchParams(location.search)
const eventId = URLparameters.get('id')

const eventsUrl = "https://striveschool-api.herokuapp.com/api/product/"

const imageInput = document.getElementById('image')
const nameInput = document.getElementById('name')
const descriptionInput = document.getElementById('description')
const priceInput = document.getElementById('price')
const brandInput = document.getElementById('brand')

if (eventId) {

    fetch(eventsUrl + '/' + eventId)
        .then((response) => {
            if (response.ok) {
                return response.json()
            } else {
                throw new Error('errore nella fetch')
            }
        })
        .then((data) => {

            imageInput.value = data.imageUrl
            nameInput.value = data.name
            descriptionInput.value = data.description
            priceInput.value = data.price
            brandInput.value = data.brand
        })
        .catch((err) => console.log('ERRORE', err))
}

const form = document.getElementById('event-form')
form.addEventListener('submit', function (e) {
    e.preventDefault()
    const priceValue = parseFloat(priceInput.value.replace('€', '').replace(',', '.'));


    const wine = new Wine(
        imageInput.value,
        nameInput.value,
        descriptionInput.value,
        priceValue,
        brandInput.value
    )

    console.log('Wine', wine)

    let methodToUse
    let URLtoUse

    if (eventId) {
        methodToUse = 'PUT'
        URLtoUse = eventsUrl + '/' + eventId
        console.log("modificato")
    } else {
        methodToUse = 'POST'
        URLtoUse = eventsUrl
        console.log("creato")
    }
    fetch(URLtoUse, {
        headers: {
            "Authorization":
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkMjQ2NjM4MzRiZjAwMTUwMDA2ZmUiLCJpYXQiOjE3NDI1NjE2OTEsImV4cCI6MTc0Mzc3MTI5MX0.h8E1vbYDfCB1CHPRXu85r9tP6fAJx58jPHJbKJdddek",
            'Content-Type': 'application/json',

        },
        method: methodToUse,
        body: JSON.stringify(wine), // oggetto wine convertito in stringa JSON


    })
        .then((response) => {

            if (response.ok) {
                // il salvataggio ha funzionato!
                alert('SALVATAGGIO COMPLETATO!')

                form.reset() // svuoto il form
            } else {
                // 400, 401, 500 etc.
                throw new Error('ricevuta response non ok dal backend')
            }
        })
        .catch((err) => {
            console.log('errore nel salvataggio!', err)
        })
})

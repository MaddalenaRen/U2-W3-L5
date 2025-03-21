// questo documento si caricherà in index.html
const printDateInFooter = function () {
    // recupero un riferimento allo span vuoto nel footer
    const footerSpan = document.getElementById('year')
    footerSpan.innerText = new Date().getFullYear()
}

printDateInFooter()

const getEvents = function () {
    const eventsURL = "https://striveschool-api.herokuapp.com/api/product/";

    fetch(eventsURL, {
        headers: {
            "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2N2RkMjQ2NjM4MzRiZjAwMTUwMDA2ZmUiLCJpYXQiOjE3NDI1NjE2OTEsImV4cCI6MTc0Mzc3MTI5MX0.h8E1vbYDfCB1CHPRXu85r9tP6fAJx58jPHJbKJdddek"
        }
    })
        .then((response) => {

            console.log("Response:", response);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {

            console.log("Dati ricevuti:", data);

            const row = document.getElementById('wine-row');
            row.innerHTML = "";

            data.forEach((wine) => {
                row.innerHTML += `
                <div class="col col-12 col-lg-3 col-md-4 col-sm-6 my-3">
                    <div class="card shadow-sm rounded-lg">
                        <img src="${wine.imageUrl}" class="card-img-top" alt="${wine.name}" />
                        <div class="card-body">
                            <h5 class="card-title">${wine.name}</h5>
                            <p class="card-text text-muted">${wine.description}</p>
                            <p class="card-text font-weight-bold">${wine.price.toLocaleString()}€</p>
                            <p class="card-text text-success">${wine.brand}</p>
                            <a href="./details.html?id=${wine._id}" class="btn btn-primary btn-block">Vai ai dettagli</a>
                        </div>
                    </div>
                </div>
                `;
            });
            document.getElementById("spinner-container").style.display = "none";
        })
        .catch((error) => {
            console.error("Errore:", error);
        });
};

getEvents();
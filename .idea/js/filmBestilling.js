console.log("Jeg er i bestilling")

document.addEventListener("DOMContentLoaded", function(){
    console.log("DOM er indlæst");
    showFilmInfo();

    const buttonSumbit = document.getElementById("reservation")
    buttonSumbit.addEventListener("click", postReservation);

});

function showFilmInfo() {
    filmData = JSON.parse(sessionStorage.getItem("chosenFilm"));// parses the JSON to a javaScript object
    console.log(filmData);
    seatData = JSON.parse(sessionStorage.getItem("selectedSeats"));
    console.log(seatData);
    showingData = JSON.parse(localStorage.getItem("showingItem"));
    console.log(showingData);
    customer1 = JSON.parse(sessionStorage.getItem("customer"))
    console.log(customer1);

    document.getElementById("titel").innerText = filmData.title; // gets the title from the html and sets it to the name of the movie
    document.getElementById("billede").src = filmData.poster_path;
    document.getElementById("dato").innerText = showingData.date + ' - kl ' + showingData.startTime ;
    document.getElementById("sal").innerText = 'Sal - ' + showingData.screenModel.screenNumber;
    let numberOfTickets = seatData.length;
    let price = calculateCost(numberOfTickets)
    if(numberOfTickets > 1){
        document.getElementById("billetter").innerText = seatData.length + ' billetter' + ' - ' + price + ' kroner';
    }else{
        document.getElementById("billetter").innerText = seatData.length + ' billet' + ' - ' + price + ' kroner';
    }
}
function calculateCost(tickets){
    return tickets * 140;
}

async function postReservation() {
    let customer = JSON.parse(sessionStorage.getItem("customer"))
    let seats = JSON.parse(sessionStorage.getItem("selectedSeats"))
   // const seatIds = seats.map(seat => seat.seatId);

    const url = "http://localhost:8080/reservation/create"

    let reservationObject = {
        customer_id: customer.customerId,
        showing_id: showingData.showingId,
        seatIds: seats
    };

    console.log(reservationObject);

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reservationObject)
        });

        if (!response.ok) {
            throw new Error(`HTTP-fejl - Status: ${response.status}`);
            console.log(formDataObject);
        }
        const responseData = await response.json(); // returns the response as a JS object

        console.log("Reservation oprettet:", responseData);

        window.location.href = "forside.html";

    }catch(error){
        console.log("Kunne ikke fetche", error)
    }




}






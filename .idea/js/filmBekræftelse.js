console.log("jeg er i confirm")

const rerserveButton = document.getElementById("submit");

document.addEventListener("DOMContentLoaded", function(){
    console.log("DOM er indlæst");
    showFilmInfo();

    const form = document.getElementById("formReservation")
    if(form){
        form.addEventListener("submit", handleFormSubmit);
    }else{
        console.log("Form not found")
    }
});

function showFilmInfo() {
    filmData = JSON.parse(sessionStorage.getItem("chosenFilm")); // parses the JSON to a javaScript object
    seatData = JSON.parse(sessionStorage.getItem("selectedSeats"));
    console.log(seatData);

    document.getElementById("titel").innerText = filmData.title; // gets the title from the html and sets it to the name of the movie
    document.getElementById("billede").src = filmData.poster_path;
}

async function handleFormSubmit(event){
    event.preventDefault()

    const form = event.currentTarget; // collects the form
    const url = form.action; // collect the url in the form

    console.log("URL", url);

    try {
        const reservationObject = new FormData(form); // we get a object from the form
        console.log(reservationObject);
        const responseData = await postFormData(url, reservationObject); // sends the form data as JSON and returns a JS object
        window.location.href = "forside.html"; // if succes... return this
    } catch (error) {
        alert(error.message);
        console.error(error);
    }
}

async function postFormData(url, formData){
    const formDataObject = Object.fromEntries(formData.entries()); // converts the reservationObject to a JS object
    console.log(formDataObject);

    const response = await fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formDataObject)
    });

    if(!response.ok){
        throw new Error(`HTTP-fejl - Status: ${response.status}`);
        console.log(formDataObject);
    }
    return response.json(); // returns the response as a JS object
}

// gem customer og videresend så info på ny side
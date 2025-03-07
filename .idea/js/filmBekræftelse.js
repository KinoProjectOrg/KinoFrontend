console.log("jeg er i confirm")

const rerserveButton = document.getElementById("submit");

document.addEventListener("DOMContentLoaded", function(){
    console.log("DOM er indlæst");
    // showFilmInfo();
})

/*
function showFilmInfo() {
    filmData = JSON.parse(localStorage.getItem("film")); // parses the JSON to a javaScript object

    document.getElementById("titel").innerText = filmData.Title; // gets the title from the html and sets it to the name of the movie
    document.getElementById("billede").src = picTest2; // filmData.href;
    document.getElementById("beskrivelse").innerText = filmData.Plot;
    document.getElementById("genre").innerText = filmData.Genre;
    document.getElementById("language").innerText = filmData.Language;
}
 */

async function handleFormSubmit(event){
    event.preventDefault()

    const form = event.currentTarget; // collects the form
    const url = form.action; // collect the url in the form

    console.log("URL", url);

    try {
        const reservationObject = new FormData(form); // we get a object from the form
        const responseData = await postFormData(url, reservationObject); // sends the form data as JSON and returns a JS object
        window.location.href = "forside.html"; // if succes... return this
    } catch (error) {
        alert(error.message);
        console.error(error);
    }
}

async function postFormdat(url, formData){
    const formDataObject = Object.fromEntries(formData.entries()); // converts the reservationObject to a JS object

    const response = await fetch(url, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(formDataObject)
    });

    if(!response.ok){
        throw new Error(`HTTP-fejl - Status: ${response.status}`);
    }
    return response.json(); // returns the response as a JS object
}

rerserveButton.addEventListener("click", handleFormSubmit)
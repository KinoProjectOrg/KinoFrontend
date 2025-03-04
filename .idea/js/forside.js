console.log("jeg er i forsiden")

const filmList = document.getElementById("filmList");
const filmUrl = "https://gist.githubusercontent.com/saniyusuf/406b843afdfb9c6a86e25753fe2761f4/raw/523c324c7fcc36efab8224f9ebb7556c09b69a14/Film.JSON";
const picTest = "https://images-na.ssl-images-amazon.com/images/M/MV5BMjQyMzI2OTA3OF5BMl5BanBnXkFtZTgwNDg5NjQ0OTE@._V1_SY1000_CR0,0,674,1000_AL_.jpg"

// fetch function to fetch films
function fetchAnyUrl(url){
    return fetch(url).then(response => response.json()).catch(error => console.error("Error when fetching", error));
}

// creates a div for every film and adds it to the container
function addFilmToFrontpage(film){
    const filmDiv = document.createElement("div") // every film gets a div
    filmDiv.className = "film-item"

    // adds a titel
    const titel = document.createElement("h3")
    //titel.innerHTML = film.titel;
    titel.innerHTML = film.Title;
    filmDiv.appendChild(titel);

    // adss a picture based on link
    const picture = document.createElement("img");
    // picture.setAttribute("src", film.hrefPhoto)
    // picture.setAttribute("src", film.Poster)
    picture.setAttribute("src", picTest)
    picture.setAttribute("alt", "x")
    picture.setAttribute("width", 150)
    picture.setAttribute("height", 150)
    filmDiv.appendChild(picture);

    // adds a book ticket button
    const button = document.createElement("button")
    button.innerHTML = "Book Tickets"
    filmDiv.appendChild(button);

    button.onclick = function() {
        localStorage.setItem("film", JSON.stringify(film)); // converts film object to JSON - later we convert the JSON back to an object
        window.location.href = "filmReservation.html"
    };

    filmList.appendChild(filmDiv);
}

let film = [] // film as an array

async function fetchFilm(){

    try{
        film = await fetchAnyUrl(filmUrl);
        console.log(film)
        film.forEach(addFilmToFrontpage)
    }catch(error){
        alert("Could not find any film")
    }
}

document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM er indlæst");
    fetchFilm();
});



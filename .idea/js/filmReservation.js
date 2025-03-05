console.log("vi er i film reservation")
const table = document.getElementById("tblShowings");

document.addEventListener("DOMContentLoaded", async function() {
    console.log("DOM er indlæst");
    showFilmInfo();
    await getShowings();
    addShowingToTable(showings);
});

function showFilmInfo(){
    filmData = JSON.parse(localStorage.getItem("film")); // parses the JSON to a javaScript object

    document.getElementById("titel").innerText = filmData.title; // gets the title from the html and sets it to the name of the movie
    document.getElementById("billede").src = filmData.poster_path; // filmData.href;
    document.getElementById("beskrivelse").innerText = filmData.overview;
    document.getElementById("genre").innerText = filmData.genre_ids;
    document.getElementById("runtime").innerText = filmData.runtime + " minutes";
}

// indsætter en ny række og for hver række et antal celler
function addShowingToTable(showings) {
    let dateRow = document.getElementById("dateRow"); // the row with dates
    let showingRow = document.getElementById("showingRow"); // the row with showings

    showings.forEach(showing => {

        // adds the showing date to a cell that gets added to a row
        const dateCell = document.createElement("th"); // create a tableheader
        dateCell.innerHTML = showing.date;
        dateRow.appendChild(dateCell);

        //
        const showCell = document.createElement("td") // creates tableData
        showCell.innerHTML = `${showing.screen.screen_number}<br>${showing.start_time}` // adds the screen and the start time
        showingRow.appendChild(showCell);

        if(showing.status === true){
            showCell.style.backgroundColor = "green";
        }else{
            showCell.style.backgroundColor = "red";
        }

    });
}
// test
/*
// Eksempeldata
let showings = [
    { Date: "2025-03-04", screen: "Sal 1", start_time: "18:00", status: false},
    { Date: "2025-03-05", screen: "Sal 2", start_time: "20:30", status: false},
    { Date: "2025-03-06", screen: "Sal 3", start_time: "16:15", status: true}
];
 */

function fetchAnyUrl(url){
    return fetch(url).then(response => response.json()).catch(error => console.error("Error when fetching", error));
}

let showings = []
const url = "http://localhost:8080/showings";

async function getShowings(){
    try{
        showings = await fetchAnyUrl(url);
        console.log(showings);
    }catch(error){
        alert("could not find any showings")
    }
}


console.log("vi er i film reservation")
const picTest2 = "https://images-na.ssl-images-amazon.com/images/M/MV5BMjQyMzI2OTA3OF5BMl5BanBnXkFtZTgwNDg5NjQ0OTE@._V1_SY1000_CR0,0,674,1000_AL_.jpg"
const table = document.getElementById("tblShowings");

document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM er indlæst");
    showFilmInfo();
    addShowingToTable(showings);
});

function showFilmInfo(){
    filmData = JSON.parse(localStorage.getItem("film")); // parses the JSON to a javaScript object

    document.getElementById("titel").innerText = filmData.Title; // gets the title from the html and sets it to the name of the movie
    document.getElementById("billede").src = picTest2; // filmData.href;
    document.getElementById("beskrivelse").innerText = filmData.Plot;
    document.getElementById("genre").innerText = filmData.Genre;
    document.getElementById("language").innerText = filmData.Language;
    document.getElementById("runtime").innerText = filmData.Runtime;
}

// indsætter en ny række og for hver række et antal celler
function addShowingToTable(showings) {
    let dateRow = document.getElementById("dateRow"); // the row with dates
    let showingRow = document.getElementById("showingRow"); // the row with showings

    showings.forEach(showing => {

        // adds the showing date to a cell that gets added to a row
        const dateCell = document.createElement("th"); // create a tableheader
        dateCell.innerHTML = showing.Date;
        dateRow.appendChild(dateCell);

        //
        const showCell = document.createElement("td") // creates tableData
        showCell.innerHTML = `${showing.screen}<br>${showing.start_time}` // adds the screen and the start time
        showingRow.appendChild(showCell);

        if(showing.status === true){
            showCell.style.backgroundColor = "green";
        }else{
            showCell.style.backgroundColor = "red";
        }

    });
}

// Eksempeldata
let showings = [
    { Date: "2025-03-04", screen: "Sal 1", start_time: "18:00", status: false},
    { Date: "2025-03-05", screen: "Sal 2", start_time: "20:30", status: false},
    { Date: "2025-03-06", screen: "Sal 3", start_time: "16:15", status: true}
];

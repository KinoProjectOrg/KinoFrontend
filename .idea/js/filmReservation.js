console.log("vi er i film reservation")
const table = document.getElementById("tblShowings");

document.addEventListener("DOMContentLoaded", async function() {
    console.log("DOM er indlæst");
    showFilmInfo();
    await getShowings();
    await addShowingToTable(showings);
});


function showFilmInfo(){
    filmData = JSON.parse(localStorage.getItem("film")); // parses the JSON to a javaScript object

    document.getElementById("titel").innerText = filmData.title; // gets the title from the html and sets it to the name of the movie
    document.getElementById("billede").src = filmData.poster_path; // filmData.href;
    document.getElementById("beskrivelse").innerText = filmData.overview;
    document.getElementById("runtime").innerText = filmData.runtime + " minutes";
    document.getElementById("alder").innerText = "Min age: " + filmData.minAge;
}

// indsætter en ny række og for hver række et antal celler
async function addShowingToTable(showings) {
    let dateRow = document.getElementById("dateRow"); // the row with dates
    let showingRow = document.getElementById("showingRow"); // the row with showings
    filmData = JSON.parse(localStorage.getItem("film"));

    let showingsByDate = {}; // js object

    // group showings by date
    showings.forEach(showing => {
        if (showing.movieModel.title === filmData.title) {
            if (!showingsByDate[showing.date]) {
                showingsByDate[showing.date] = []; // create a new date array inside object
            }
            showingsByDate[showing.date].push(showing); // push the showing to the date array inside object
        }
    });

    // iterate through each date (each key in the object)
    Object.keys(showingsByDate).forEach(date => {
        // add the showing date to a cell that gets added to a row
        const dateCell = document.createElement("th"); // create a table header with date
        dateCell.innerHTML = date;
        dateRow.appendChild(dateCell);
    });

    // find maximal number of showings on a given date to know how many rows to create
    let maxShowings = Math.max(...Object.values(showingsByDate).map(showings => showings.length));

    for (let i = 0; i < maxShowings; i++) {
        let showingRow = document.createElement("tr");
        showingRow.classList = "clickable_row";

        // iterate through each date
        Object.keys(showingsByDate).forEach(date => {
            const showings = showingsByDate[date];
            const showCell = document.createElement("td"); // for each date create a td

            if (showings[i]) { // if a showing exists for this date and index
                showing = showings[i];
                showCell.innerHTML = `Sal ${showing.screenModel.screenNumber} - ${showing.startTime}`;

                checkSeatAvailability(showing, showCell);

            }
            showingRow.appendChild(showCell);

            showCell.onclick = function() {
                // Find the showing for this specific date and index
                const selectedShowing = showingsByDate[date][i];

                // Store the showing object in localStorage
                localStorage.setItem("showingItem", JSON.stringify(selectedShowing));

                // Navigate to the seatReservation page
                window.location.href = "seatReservation.html";
            };

           // if(showings[i].)

        });

        table.appendChild(showingRow); // add the row to the table
    }
}

function fetchAnyUrl(url){
    return fetch(url).then(response => response.json()).catch(error => console.error("Error when fetching", error));
}

let showings = []
const url = "http://localhost:8080/showing/showings";

async function getShowings(){
    try{
        showings = await fetchAnyUrl(url);
        console.log(showings);
    }catch(error){
        alert("could not find any showings")
    }
}

// Function to check if all seats are taken for a specific showing
async function checkSeatAvailability(showing, showCell) {
    const url = `http://localhost:8080/reservation/seatsInShow/${showing.showingId}`;
    try {
        let seats = await fetchAnyUrl(url) // fetches all seats based on showingId
        console.log(seats);

        const allSeatsTaken = seats.every(seat => seat.reserved === true); // Check if all seats are occupied with every
        const someSeatsTaken = seats.some(seat => seat.reserved === true);

        if (allSeatsTaken) {
            // If all seats are taken, make the cell red
            showCell.style.backgroundColor = "red";
        }else if(someSeatsTaken){
            showCell.style.backgroundColor = "orange";
        }else{
            showCell.style.backgroundColor = "green";
        }
    } catch (error) {
        console.error("Error fetching seat data:", error);
    }
}


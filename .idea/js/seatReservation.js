//import function that returns show data

// const showInfo = function that returns show data
const showInfo = 1
// map for all seats, the seats that are reserved and a set for those that will be selected
let mapSeats = new Map();
let mapReserved = new Map();
let selectedSeats = new Set();

//event so when the page is loaded all the seats appears.
document.addEventListener("DOMContentLoaded", async () => {
    await getReservedSeats();
    await loadAllSeats();
    creatingSeats();
});

const seatContainer = document.querySelector("#seatContainer");
const seatInput = document.querySelector("#seatLimit")
//Method to get the reservation, to find reserved seats.
async function getReservedSeats(){
    try {
        const url = "http://localhost:8080/reservation/" + showInfo
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        console.log(response)
        const result = await response.json()
        console.log(result)

        result.forEach(seat => {
                mapReserved.set(seat.seatId, seat)
        })
    }
    catch(error){
        console.log("failed" + error.message)
    }
}

async function loadAllSeats(){
    try {
        const url = "http://localhost:8080/reservation/seatsInShow/" + 1
        const response = await fetch(url)
        console.log(response)
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json()
        console.log(result)

        result.forEach(seat => {
            mapSeats.set(seat.seatId, seat)
        })
    }
    catch (error) {
        console.log(error.message)
    }
}

function creatingSeats(){
    const seatsPerRow = 10;

    let currentRow;
    let seatIndex = 0;
    mapSeats.forEach((seat, seatId) => {
        //if statment should only create a new row in begninning og when seatIndex hits the seatsPerRow number.
        if (seatIndex % seatsPerRow === 0) {
            currentRow = document.createElement('div');
            currentRow.classList.add('row'); // Add a class for styling rows
            seatContainer.appendChild(currentRow); // Append the new row to the container
        }

        //making the seats
        const seatElement = document.createElement('div');
        seatElement.classList.add('seat'); // Add a class for styling seats
        seatElement.setAttribute("data-seat-id",seatId) //add the seat id to specific seat so its easier to get later
        seatElement.innerHTML = seat.seatNo; // Display the seat ID (or any other info)

        // Check if the seat is reserved
        if (mapReserved.has(seatId)) {
            seatElement.classList.add('reserved'); // lass for styling, reserved = red
        } else {
            seatElement.classList.add('available'); // class for styling, available = green
        }

        seatElement.addEventListener("click", (event)=>{
            const maxSeats = parseInt(seatInput.value)

            if(seatElement.classList.contains("reserved")){
                alert(`Seat: ${seat.seatNo} is reserved`)
                return;
            }
            else if(seatElement.classList.contains("selected")){
                seatElement.classList.replace("selected", "available")
                selectedSeats.delete(seatId)
            }
            else {
                if(selectedSeats.size >= maxSeats){
                    alert("Maximum number of seats selected")
                    return;
                }

                console.log(`Seat: ${seat.seatNo} is selected`)
                seatElement.classList.replace("available", "selected")
                selectedSeats.add(seatId)
            }
        })

        // setting the seat in the row
        currentRow.appendChild(seatElement);
        // Increment the seat index, so the method will know when to create new row.
        seatIndex++;
    });
}

seatInput.addEventListener("input", () => {
    let value = parseInt(seatInput.value); // Get the current input value

    // Validate the value
    if (value < 1) {
        seatInput.value = 1; // Reset to the minimum value
    } else if (value > 10) {
        seatInput.value = 10; // Reset to the maximum value
    }
});
// Made a function that can transfer the data to another javascript file.
function getSelectedSeats(){
    return Array.from(selectedSeats)
}

window.getSelectedSeats = getReservedSeats;
const reservationTable = document.getElementById("reservationTable")
const reservationBody = document.getElementById("reservationBody");
const searching = document.querySelector("#search-input")
let reservationMap = new Map;

document.addEventListener("DOMContentLoaded", reservationSetup)

const urlRes = "http://localhost:8080/reservation/"
async function reservationSetup(){

    await getReservations(urlRes + "get");

    reservationMap.forEach(reservation => {
        createReservation(reservation);
    })
}


async function getReservations(url){
    try {
        const response = await fetch(url);
        if (response.ok) {
            let result = await response.json();
            console.log(result)
            result.forEach(reservation => {
                reservationMap.set(reservation.reservationId, reservation)
            })
        }
    }
    catch (error){
        alert(error.message)
    }
}

function createReservation(reservation){
    let cellCount = 0;
    let rowCount = reservationBody.rows.length;
    let row = reservationBody.insertRow(rowCount);
    row.id = reservation.reservationId

    // kunde navn
    let cell = row.insertCell(cellCount++)
    cell.innerHTML = reservation.customer.username

    // reservations id
    cell = row.insertCell(cellCount++);
    cell.innerHTML = reservation.reservationId;

    //showing id
    cell = row.insertCell(cellCount++);
    cell.innerHTML = reservation.showing.showingId;



    cell = row.insertCell(cellCount++);
    const deleteRes = document.createElement("input")
    deleteRes.type = "button"
    deleteRes.setAttribute("value", `Slet ${reservation.reservationId}`);
    deleteRes.onclick = () => {
        row.remove()
        deleteReservation(reservation)
    }
    cell.appendChild(deleteRes);

}



async function deleteReservation(reservation){
    let urldel = urlRes + "delete/" + reservation.reservationId;
    const response = await restDelete(urldel);

    if(response.ok){
        const body = await response.text();
        reservationMap.delete(reservation.reservationId);
        alert(body);
    }
    else{
        error = response.status
        alert(error)
    }

}

async function restDelete(url){
    const fetchOptions = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: ""
    };
    const resp = await fetch(url, fetchOptions)
    return resp;
}

function search(){
    const input = searching.value;
    clearTable();

    if (input === "") {
        reservationMap.forEach(reservation => createReservation(reservation));
        return;
    }

    const searchs = Array.from(reservationMap.values()).filter(reservation =>
        reservation.customer.username.toLowerCase().startsWith(input.toLowerCase())
    );
    searchs.forEach(reservation => createReservation(reservation));
}


function clearTable() {
    const rows = reservationBody.rows.length;
    console.log(rows);
    for (let i = rows - 1; i >= 0; i--) {
        reservationBody.deleteRow(i);
    }
}

searching.addEventListener("input", search)
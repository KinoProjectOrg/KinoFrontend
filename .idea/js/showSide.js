const showTable = document.getElementById("showTable");
let bodyTable = document.getElementById("showBody");

let showings = []

const urlShow = "http://localhost:8080/showing/"

document.addEventListener("DOMContentLoaded", async function () {
    const url = urlShow + "showings"

    showings = await fetchAnyUrl(url);
    console.log(showings);

    showings.forEach(show => {

        let cellCount = 0;
        let rowCount = bodyTable.rows.length;
        let row = bodyTable.insertRow(rowCount);
        row.id = show.showingId

        let cell = row.insertCell(cellCount++)
        cell.innerHTML = show.movieModel.title

        cell = row.insertCell(cellCount++)
        cell.innerHTML = show.screenModel.screenNumber

            cell = row.insertCell(cellCount++);
        cell.innerHTML = show.date

        //showing id
        cell = row.insertCell(cellCount++);
        cell.innerHTML = show.startTime


        cell = row.insertCell(cellCount++);
        const deleteShow = document.createElement("input")
        deleteShow.type = "button"
        deleteShow.setAttribute("value", `Slet ${show.showingId}`);
        deleteShow.onclick = () => {
            row.remove()
            deleteShowing(show)
        }
        cell.appendChild(deleteShow);


    })
})

function fetchAnyUrl(url) {
    return fetch(url).then(response => response.json()).catch(error => console.error("Error when fetching", error));
}

async function deleteShowing(show){
    let urldel = urlShow + "filmoperator/delete/" + show.showingId;
    const response = await restDelete(urldel);

    if(response.ok){
        const body = await response.text();
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
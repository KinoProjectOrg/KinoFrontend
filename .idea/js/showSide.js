const showTable = document.getElementById("showTable");
let bodyTable = document.getElementById("showBody");

let showings = []

document.addEventListener("DOMContentLoaded", async function () {
    const url = "http://localhost:8080/showings"

    showings = await fetchAnyUrl(url);
    console.log(showings);

    showings.forEach(show => {
        let row = document.createElement("tr")
        row.innerHTML = `
            <th>${show.movieModel.title}</th>
            <th>${show.screenModel.screenNumber}</th>
            <th>${show.date}</th>
            <th>${show.startTime}</th>
           
        `
        bodyTable.appendChild(row);
    })
})

function fetchAnyUrl(url){
    return fetch(url).then(response => response.json()).catch(error => console.error("Error when fetching", error));
}
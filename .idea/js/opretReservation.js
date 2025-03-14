// Get form element and add submit event listener
const formReservation = document.getElementById("formReservation");
formReservation.addEventListener("submit", handleFormSubmit);

// Map to store showing details
let showingMap = new Map();

// Handle form submission
async function handleFormSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const url = form.action;

    try {
        // Get form data
        const formData = new FormData(form);
        const plainFormData = Object.fromEntries(formData.entries());

        // Get showing ID and number of tickets
        const showingId = parseInt(plainFormData.showingId);
        const numTickets = parseInt(document.getElementById("seatLimit").value || "1");

        // Tjekker om inputs er rigtige
        if (!showingId) {
            throw new Error("Vælg venligst en forestilling");
        }

        if (!plainFormData.username) {
            throw new Error("Indtast venligst et brugernavn");
        }

        if (!plainFormData.password) {
            throw new Error("Indtast venligst en adgangskode");
        }

        // find sædder udfra hvor mange billeter man vælger
        const seats = await findAdjacentSeats(showingId, numTickets);

        if (!seats || seats.length < numTickets) {
            throw new Error(`Kunne ikke finde ${numTickets} ledige pladser ved siden af hinanden`);
        }

        // Laver det objekt der sendes til backend
        const reservationObject = {
            customer: {
                username: plainFormData.username,
                password: plainFormData.password
            },
            showing: {
                showingId: showingId
            },
            seatList: seats.map(seatId => ({ seatId }))
        };

        console.log("Sending reservation:", reservationObject);

        // Send the request
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(reservationObject)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
        }

        // Show success message and redirect
        alert(`Ny reservation tilføjet med ${numTickets} pladser`);
        setTimeout(() => {
            window.location.href = "adminReservationPage.html";
        }, 2000);

    } catch (error) {
        alert(error.message);
        console.error(error);
    }
}

// Find adjacent available seats
async function findAdjacentSeats(showingId, numTickets) {
    try {
        // Array to store our selected seat IDs
        const selectedSeats = [];

        // Generate random seat IDs between 1-200
        for (let i = 0; i < numTickets; i++) {
            // Generate a random number between 1 and 200
            const randomSeatId = Math.floor(Math.random() * 200) + 1;

            // Add to our selected seats array
            selectedSeats.push(randomSeatId);
        }

        console.log(`Generated ${numTickets} random seat IDs:`, selectedSeats);

        // Return the array of random seat IDs
        return selectedSeats;

    } catch (error) {
        console.error("Error generating random seats:", error);
        throw new Error("Kunne ikke generere tilfældige pladser: " + error.message);
    }
}

// viser forestillinger i dropdown
document.addEventListener("DOMContentLoaded", async () => {
    await loadShowings();
});


async function loadShowings() {
    const url = "http://localhost:8080/showing/showings";
    const dropdown = document.querySelector("#dropdown");

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // Clear existing options except the first one
        while (dropdown.options.length > 1) {
            dropdown.remove(1);
        }

        // Add each showing as an option
        data.forEach(showing => {
            const option = document.createElement("option");
            option.value = showing.showingId;

            // Format display text
            const movieTitle = showing.movieModel.title;
            const date = new Date(showing.date).toLocaleDateString('da-DK');
            const time = showing.startTime;
            const screen = showing.screenModel.screenNumber;

            // sætter det så alle værdierne bliver vist i dropdown
            option.textContent = `${movieTitle} - ${date} ${time} (Sal ${screen})`;

            // Store showing details for later use
            showingMap.set(showing.showingId, showing);

            dropdown.appendChild(option);
        });
    } catch (error) {
        console.error("Fejl ved indlæsning af forestillinger:", error);
        alert("Kunne ikke indlæse forestillinger: " + error.message);
    }
}

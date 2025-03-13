const formForestilling = document.getElementById("formForestilling")
formForestilling.addEventListener("submit", handleFormSubmit)


async function handleFormSubmit(event){
    event.preventDefault()
    const form = event.currentTarget;
    const url = form.action;
    console.log(form);
    console.log(url);

    try {
        const formData = new FormData(form);
        console.log(formData);
        const responseData = await postFormDataAsJson(url, formData);
        alert("Ny forestilling tilføjet")
        setTimeout(() => {
            window.location.href = "showSide.html";
        }, 2000);
    } catch (error) {
        alert(error.message);
        console.error(error);
    }

}



async function postFormDataAsJson(url, formData) {
    const plainFormData = Object.fromEntries(formData.entries());
    console.log(plainFormData)

    const timeParts = plainFormData.start_time.split(':');
    let hours = String(parseInt(timeParts[0])).padStart(2, '0');
    let minutes = String(parseInt(timeParts[1])).padStart(2, '0');
    const formattedTime = `${hours}:${minutes}:00`;
    console.log(formattedTime)
    // Create the request object with the structure your ShowingModel expects
    const requestData = {
        movieModel: {
            id: plainFormData.movie_id,  // Use the movie ID from the form data
        },
        screenModel: {
            screenId: plainFormData.screen_id, // Use the screen ID from the form data
        },
        date: plainFormData.date,              // Use the date from the form data
        startTime:  formattedTime    // Use the start time from the form data
    };


    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requestData),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
    }

    // Try to parse the response as JSON if there is one
    try {
        return await response.json();
    } catch (e) {
        // If there's no JSON response or it can't be parsed, just return the response
        return response;
    }
}

let movieMap = new Map;

document.addEventListener("DOMContentLoaded", async () =>{
    const url = "http://localhost:8080/movies/get"
    const dropdown = document.querySelector("#dropdown");
    try {
        const response = await fetch(url);

        if(!response.ok){
            throw new Error(response.status);
        }
        const data = await response.json();
        data.forEach(movie => {
            const option = document.createElement("option");
            option.value = movie.id;
            option.textContent = movie.title;
            movieMap.set(movie.id, movie)
            console.log(movie)
            dropdown.appendChild(option);
        })}
    catch (error){
        console.error("error", error);
    }
})
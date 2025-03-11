function handleRegister(event) {
    event.preventDefault();

    const username = document.getElementById("newUsername").value;
    const password = document.getElementById("newPassword").value;


    const registerData = {
        username: username,
        password: password,
    };

    fetch('http://localhost:8080/registerCustomer', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(registerData)
    })
        .then(response => {
            if (response.ok) {
                alert("Bruger oprettet!");
                window.location.href = "login.html"; // man bliver sendt videre til login siden
            } else {
                alert("Fejl ved oprettelse af bruger.");
            }
        })
        .catch(error => {
            console.error("Error during registration:", error);
        });
}
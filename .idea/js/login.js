function handleLogin(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const loginData = {
        username: username,
        password: password
    };

    fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    })
        .then(response => {
            if (response.ok) {
                alert("Login successful!");
                window.location.href = "forside.html"; // hvor skal vi hen??? mangler en side til en kunde
            } else {
                alert("Fejl ved login, prøv igen.");
            }
        })
        .catch(error => {
            console.error("Error during login:", error);
        });
}
function handleLogin(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const loginData = {
        username: username,
        password: password
    };

    console.log(loginData)
    fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    })
        .then(response => {
            if (response.ok) {
                return response.json().then(data => {
                    alert("Login successful!");
                    console.log("Response data:", data);

                    // Store the JSON data in localStorage
                    localStorage.setItem("customer", JSON.stringify(data));
                    console.log("Stored in localStorage:", localStorage.getItem("customer"));

                    window.location.href = "forside.html";
                });
            } else {
                alert("Fejl ved login, prøv igen.");
            }
        })
        .catch(error => {
            console.error("Error during login:", error);
        });
}


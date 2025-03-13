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

                    if (!data.role) {
                        data.role = "USER";
                    }
                    // Store the JSON data in localStorage
                    localStorage.setItem("customer", JSON.stringify(data));
                    console.log("Stored in localStorage:", localStorage.getItem("customer"));
                    alert("Login successful!");

                    // Redirect based on role
                    if (data.role === "ADMIN") {
                        window.location.href = "adminPage.html";
                    } else if (data.role === "FILM_OPERATOR") {
                        window.location.href = "showSide.html";
                    } else {
                        // Regular customer
                        window.location.href = "forside.html";
                    }

                });
            } else {
                alert("Fejl ved login, prøv igen.");
            }
        })
        .catch(error => {
            console.error("Error during login:", error);
        });
}


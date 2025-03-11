
const formAnsat = document.getElementById("formAnsat")
formAnsat.addEventListener("submit", handleFormSubmit)


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
        alert("Ny ansat tilføjet")
        setTimeout(2000)
        window.location.href = "adminPage.html"
    } catch (error) {
        alert(error.message);
        console.error(error);
    }

}



async function postFormDataAsJson(url, formData) {
    const plainFormData = Object.fromEntries(formData.entries());
    console.log(plainFormData)
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(plainFormData), });
}
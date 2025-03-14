import {saveChanges, enableEditMode, updateEmployee} from "./moduleAdminPage.js";


const employeeTable = document.getElementById("employee_table")
const employeeTableBody = document.getElementById("employee_table_body");
let employeeMap = new Map

const urlEmp = "http://localhost:8080/employee/"

document.addEventListener("DOMContentLoaded", EmployeeSetup);

async function EmployeeSetup(){

        await getEmployees(urlEmp + "get");

        employeeMap.forEach(employee => {
            createEmployee(employee);
        })
}


async function getEmployees(url){
    try {
        const response = await fetch(url);
        if (response.ok) {
            let result = await response.json();
            console.log(result)
            result.forEach(employee => {
                employeeMap.set(employee.employeeId, employee)
            })
        }
    }
    catch (error){
        alert(error.message)
    }
}

let pictureNum = 1;

function createEmployee(employee){
    let cellCount = 0;
    let rowCount = employeeTableBody.rows.length;
    let row = employeeTableBody.insertRow(rowCount);
    row.id = employee.employeeId

    let photoCell = row.insertCell(cellCount++);
    const photo = document.createElement("img");
    photo.src = employee.photoUrl || `./pictures/pic${pictureNum++}.jpg`
    photo.alt = `${employee.username}'s photo`;
    photo.style.width = "80px"; // Set width
    photo.style.height = "80px"; // Set height
    photo.style.objectFit = "cover"; // Maintain aspect ratio
    photo.style.borderRadius = "50%"; // Make it circular
    photo.addEventListener("click", () => {
        if( photo.style.width === "200px") {
            photo.style.width = "80px";
            photo.style.height = "80px";
        }
        else{
            photo.style.width = "200px";
            photo.style.height = "200px";
        }
    })
    photoCell.appendChild(photo);

    let cell = row.insertCell(cellCount++);
    cell.innerHTML = employee.username;

    cell = row.insertCell(cellCount++);
    cell.innerHTML = employee.role;

    cell = row.insertCell(cellCount++);
    const deleteEmp = document.createElement("input")
    deleteEmp.type = "button"
    deleteEmp.setAttribute("value", `Slet ${employee.username}`);
    deleteEmp.onclick = () => {
        row.remove()
        deleteEmployee(employee)
    }
    cell.appendChild(deleteEmp);

    cell = row.insertCell(cellCount++);
    const updateEmp = document.createElement("input");
    updateEmp.type = "button";
    updateEmp.setAttribute("value", `Opdater ${employee.username}`);
    updateEmp.className = "update-btn";

    // Flag to track if we're in edit mode
    let isEditing = false;

    updateEmp.onclick = () => {
        if (!isEditing) {
            // Switch to edit mode
            enableEditMode(row, employee);
            updateEmp.value = "Gem ændringer"; // Change button text to "Save changes"
            isEditing = true;
        } else {
            // Save changes and switch back to display mode
            saveChanges(row, employee);
            updateEmp.value = `Opdater ${employee.username}`;
            isEditing = false;
        }
    };

    cell.appendChild(updateEmp);
}



async function deleteEmployee(employee){
    let urldel = urlEmp + "delete/" + employee.employeeId;
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



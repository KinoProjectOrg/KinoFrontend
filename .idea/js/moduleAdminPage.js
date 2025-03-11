
const urlEmp = "http://localhost:8080/employee/"

// Function to enable edit mode for a row
function enableEditMode(row, employee) {
    // Get the cells that contain data (name and role)
    const nameCell = row.cells[1];
    const roleCell = row.cells[2];

    // Store the current values
    const currentName = nameCell.textContent;
    const currentRole = roleCell.textContent;

    // Replace with input fields
    nameCell.innerHTML = `<input type="text" class="edit-input" value="${currentName}">`;
    roleCell.innerHTML = `<input type="text" class="edit-input" value="${currentRole}">`;
}

// Function to save changes and return to display mode
async function saveChanges(row, employee) {
    // Get the input values
    const nameInput = row.cells[1].querySelector('input').value;
    const roleInput = row.cells[2].querySelector('input').value;

    // Update the employee object
    employee.name = nameInput;
    employee.role = roleInput;

    try {
        // Send the updated data to the server
        const response = await updateEmployee(employee);

        if (response.ok) {
            // Update was successful, switch back to display mode
            row.cells[1].innerHTML = nameInput;
            row.cells[2].innerHTML = roleInput;

            // Update the delete and update buttons with the new name
            const deleteBtn = row.cells[3].querySelector('input');
            deleteBtn.value = `Slet ${nameInput}`;

            const updateBtn = row.cells[4].querySelector('input');
            updateBtn.value = `Opdater ${nameInput}`;

            alert("Employee updated successfully!");
        } else {
            alert("Failed to update employee: " + response.status);
            // Revert to original values
            row.cells[1].innerHTML = employee.name;
            row.cells[2].innerHTML = employee.role;
        }
    } catch (error) {
        alert("Error updating employee: " + error.message);
        // Revert to original values
        row.cells[1].innerHTML = employee.name;
        row.cells[2].innerHTML = employee.role;
    }
}
async function updateEmployee(employee) {
    const url = urlEmp + "update/" + employee.employeeId;

    const fetchOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(employee)
    };

    try {
        const response = await fetch(url, fetchOptions);
        return response;
    } catch (error) {
        console.error("Error updating employee:", error);
        throw error;
    }
}


export {saveChanges, enableEditMode, updateEmployee};
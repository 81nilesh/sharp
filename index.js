let form = document.querySelector("form");
let main = document.querySelector(".main");
let cAll = document.querySelector("#cAll");

let editedIndex = -1; // Keep track of the index being edited

form.addEventListener("submit", (event) => {
    event.preventDefault();

    let expenseAmount = event.target.Choose.value;
    let description = event.target.description.value;
    let category = event.target.Category.value;

    let expenseData = JSON.parse(localStorage.getItem("expenseDetails")) || [];

    if (editedIndex === -1) {
        // Adding new expense
        expenseData.push({
            'expenseAmount': expenseAmount,
            'description': description,
            'category': category
        });
    } else {
        // Editing existing expense
        expenseData[editedIndex] = {
            'expenseAmount': expenseAmount,
            'description': description,
            'category': category
        };
        editedIndex = -1; // Reset the editedIndex
    }

    localStorage.setItem("expenseDetails", JSON.stringify(expenseData));
    event.target.reset();
    displayData();
});

let displayData = () => {
    let expenseData = JSON.parse(localStorage.getItem("expenseDetails")) || [];
    let finalData = '';
    expenseData.forEach((element, i) => {
        finalData += `
        <div class="items">
            <h5>Expense Amount</h5>
            <div>${element.expenseAmount}</div>

            <h5>Description</h5>
            <div>${element.description}</div>

            <h5>Category</h5>
            <div>${element.category}</div>
            
            <button class="delete-btn" onclick='removeData(${i})'>Delete Expense</button>
            <button class="edit-btn" onclick='editData(${i})'>Edit Expense</button>
        </div>`;
    });
    main.innerHTML = finalData;
};

let removeData = (index) => {
    let expenseData = JSON.parse(localStorage.getItem("expenseDetails")) || [];
    expenseData.splice(index, 1);

    localStorage.setItem("expenseDetails", JSON.stringify(expenseData));
    displayData();
};

let editData = (index) => {
    editedIndex = index;
    let expenseData = JSON.parse(localStorage.getItem("expenseDetails")) || [];
    let editedExpense = expenseData[index];

    // Populate the form with the selected expense data for editing
    let formInputs = form.elements;
    formInputs.Choose.value = editedExpense.expenseAmount;
    formInputs.description.value = editedExpense.description;
    formInputs.Category.value = editedExpense.category;
};

cAll.addEventListener("click", () => {
    localStorage.removeItem("expenseDetails");
    displayData();
});

displayData();

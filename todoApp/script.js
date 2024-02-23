
//In this TODO application, you'll learn how to handle form inputs, manage local storage, perform CRUD (Create, Read, Update, Delete)
//operations on tasks, implement event listeners, and toggle UI elements.
//localStorage offers methods for saving, retrieving, and deleting items. The items you save can be of any JavaScript data type.
//For instance, the setItem() method is used to save an item, and the getItem() method retrieves the item. To delete a specific item, you can utilize the removeItem() method, or if you want to delete all items in the storage, you can use clear().


const taskForm = document.getElementById("task-form");
const confirmCloseDialog = document.getElementById("confirm-close-dialog");
const openTaskFormBtn = document.getElementById("open-task-form-btn");
const closeTaskFormBtn = document.getElementById("close-task-form-btn");
const addOrUpdateTaskBtn = document.getElementById("add-or-update-task-btn");
const cancelBtn = document.getElementById("cancel-btn");
const discardBtn = document.getElementById("discard-btn");
const tasksContainer = document.getElementById("tasks-container");
const titleInput = document.getElementById("title-input");
const dateInput = document.getElementById("date-input");
const descriptionInput = document.getElementById("description-input");

//Create a taskData constant and set it to an empty array. This array will store all the tasks along with their associated data, including title, due date, and description. 
//This storage will enable you to keep track of tasks, display them on the page, and save them to localStorage.
//Use let to create a currentTask variable and set it to an empty object. This variable will be used to track the state when editing and discarding tasks.
//Set taskData to the retrieval of data from local storage or an empty array. Make sure you parse the data coming with JSON.parse() because you saved it as a string.
const taskData = JSON.parse(localStorage.getItem("data")) || [];
let currentTask = {};


//${titleInput.value}: This syntax is part of a JavaScript template literal.
//The ${} syntax is used for string interpolation in template literals. It allows you to embed expressions (variables or expressions) inside a string.
//In this context, ${titleInput.value} retrieves the value of the titleInput input field and embeds it as a string within the template literal.
//String interpolation provides a more readable and concise way to create strings compared to traditional string concatenation. It is supported in various programming languages, and the syntax may vary slightly depending on the language.

//titleInput.value: This syntax is a direct property access on the titleInput object.
//It directly retrieves the value property of the titleInput object, which is typically an input field.
//This is a more traditional way of accessing the value of an input field without using template literals or string interpolation.
const addOrUpdateTask = () => {
  const dataArrIndex = taskData.findIndex((item) => item.id === currentTask.id);
  const taskObj = {
    id: `${titleInput.value.toLowerCase().split(" ").join("-")}-${Date.now()}`,
    title: titleInput.value,
    date: dateInput.value,
    description: descriptionInput.value,
  };

  //unshift() is an array method that is used to add one or more elements to the beginning of an array.
  if (dataArrIndex === -1) {
    taskData.unshift(taskObj);
  } else {
    taskData[dataArrIndex] = taskObj;
  }

  //Local storage is a web browser feature that lets web applications store key-value pairs persistently within a user's browser. 
  //This allows web apps to save data during one session, then retrieve it in a later page session.
  localStorage.setItem("data", JSON.stringify(taskData));
  updateTaskContainer()
  reset()
};

const updateTaskContainer = () => {
  tasksContainer.innerHTML = "";

  taskData.forEach(
    ({ id, title, date, description }) => {
        (tasksContainer.innerHTML += `
        <div class="task" id="${id}">
          <p><strong>Title:</strong> ${title}</p>
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Description:</strong> ${description}</p>
          <button onclick="editTask(this)" type="button" class="btn">Edit</button>
          <button onclick="deleteTask(this)" type="button" class="btn">Delete</button> 
        </div>
      `)
    }
  );
};

//findIndex is an array method that lets find the index of the first element in an array that satisfies a given testing function.
//You need to determine whether the task being added already exists or not. If it doesn't exist, you will add it, and if it already exists, you will set it up for editing. You can use the findIndex() method to accomplish this.
const deleteTask = (buttonEl) => {
  const dataArrIndex = taskData.findIndex(
    (item) => item.id === buttonEl.parentElement.id
  );

  //splice() is an array method that modifies arrays by removing, replacing, or adding elements at a specified index, while also returning the removed elements. It can take up to three arguments: the first one is the mandatory index at which to start, the second is the number of items to remove, and the third is an optional replacement element.
  //dataArrIndex is the index to start and 1 is the number of items to remove.
  buttonEl.parentElement.remove();
  taskData.splice(dataArrIndex, 1);
  localStorage.setItem("data", JSON.stringify(taskData));
}

const editTask = (buttonEl) => {
    const dataArrIndex = taskData.findIndex(
    (item) => item.id === buttonEl.parentElement.id
  );

  currentTask = taskData[dataArrIndex];

  titleInput.value = currentTask.title;
  dateInput.value = currentTask.date;
  descriptionInput.value = currentTask.description;

  addOrUpdateTaskBtn.innerText = "Update Task";

  //classList: This is a property of DOM elements that provides access to the list of classes (CSS classes) assigned to that element.
  //toggle("hidden"): This is a method of the classList property. The toggle method adds the specified class if it's not present, and removes it if it is. 
  taskForm.classList.toggle("hidden");  
}

const reset = () => {
  titleInput.value = "";
  dateInput.value = "";
  descriptionInput.value = "";
  taskForm.classList.toggle("hidden");
  currentTask = {};
}

if (taskData.length) {
  updateTaskContainer();
}

openTaskFormBtn.addEventListener("click", () =>
  taskForm.classList.toggle("hidden")
);

closeTaskFormBtn.addEventListener("click", () => {
  const formInputsContainValues = titleInput.value || dateInput.value || descriptionInput.value;
  const formInputValuesUpdated = titleInput.value !== currentTask.title || dateInput.value !== currentTask.date || descriptionInput.value !== currentTask.description;

  //showModal() is a method associated with the HTML dialog element. It is used to display a modal dialog box on a web page.
  if (formInputsContainValues && formInputValuesUpdated) {
    confirmCloseDialog.showModal();
  } else {
    reset();
  }
});

cancelBtn.addEventListener("click", () => confirmCloseDialog.close());

//close() is a method of the window object you can use to close the current window, or a modal you create with the dialog element.
discardBtn.addEventListener("click", () => {
  confirmCloseDialog.close();
  reset()
});

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  addOrUpdateTask();
});
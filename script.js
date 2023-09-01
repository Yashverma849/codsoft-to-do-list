document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");

    // Load tasks from local storage on page load
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Function to update the task list
    function updateTaskList() {
        taskList.innerHTML = "";
        tasks.forEach(function(task, index) {
            const li = document.createElement("li");
            li.innerHTML = `
                <span>${task}</span>
                <button class="deleteTask" data-index="${index}">Delete</button>
            `;
            taskList.appendChild(li);
        });
    }

    // Add a new task
    addTaskButton.addEventListener("click", function() {
        const newTask = taskInput.value.trim();
        if (newTask !== "") {
            tasks.push(newTask);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            taskInput.value = "";
            updateTaskList();
        }
    });

    // Delete a task
    taskList.addEventListener("click", function(e) {
        if (e.target.classList.contains("deleteTask")) {
            const index = e.target.getAttribute("data-index");
            tasks.splice(index, 1);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            updateTaskList();
        }
    });

    // Initial rendering
    updateTaskList();
});

async function getTodos() {

    const response = await fetch("http://localhost:5000/todos");

    const todos = await response.json();

    const todoList = document.getElementById("todoList");

    todoList.innerHTML = "";

    todos.forEach(todo => {

        todoList.innerHTML += `
            <p>
                ${todo.id}. ${todo.task} - ${todo.status}
            </p>
        `;

    });
}


async function addTodo() {

    const task = document.getElementById("taskInput").value;

    const response = await fetch("http://localhost:5000/todos", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            task: task
        })

    });

    const todo = await response.json();

    console.log(todo);

    getTodos();
}
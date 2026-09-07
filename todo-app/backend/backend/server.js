const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let todos = [
    {
        id: 1,
        task: "Learn Node.js",
        status: "pending"
    },
    {
        id: 2,
        task: "Practice Postman",
        status: "completed"
    }
];

app.get("/todos", (req, res) => {
    res.json(todos);
});
app.get("/todos/:id", (req, res) => {

    const id = Number(req.params.id);

    const todo = todos.find(todo => todo.id === id);

    res.json(todo);

});

app.post("/todos", (req, res) => {

    const newTodo = {
        id: todos.length + 1,
        task: req.body.task,
        status: "pending"
    };

    todos.push(newTodo);

    res.json(newTodo);
});

app.delete("/todos/:id", (req, res) => {

    const id = Number(req.params.id);

    todos = todos.filter(todo => todo.id !== id);

    res.json({
        message: "Todo deleted"
    });
});

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});
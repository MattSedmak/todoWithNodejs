const express = require("express");
const Task = require("../models/task");
const router = express.Router();

const todoController = require("../controllers/todoController");

//Render todos to screen - start & add new tasks.
router.get("/", todoController.todo_list_all);
router.post("/", todoController.todo_create_post);

//Update todos
router.get("/edit/:id", todoController.todo_list_edit);
router.post("/edit/:id", todoController.todo_update_post);

// Change status routes. TRUE = Complete
router.get("/done/:id", todoController.todo_done);
router.get("/notDone/:id", todoController.todo_not_done);

//Delete
router.get("/delete/:id", todoController.todo_delete);

module.exports = router;

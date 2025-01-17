const Task = require("../models/task");

// Display all todos on start
exports.todo_list_all = async (req, res) => {
  const id = req.params.id;
  const page = +req.query.page || 1;
  const sort = +req.query.sort || 1;
  try {
    const totalTasks = await Task.countDocuments();
    const limitPerPage = 2;
    const totalPages = Math.ceil(totalTasks / limitPerPage);
    const dataToShow = limitPerPage * page;
    const Tasks = await Task.find().limit(dataToShow).sort({ date: sort });
    res.render("index.ejs", {
      Tasks,
      page,
      sort,
      totalTasks,
      totalPages,
      limitPerPage,
      dataToShow,
      message: "",
    });
  } catch (err) {
    if (err) return res.send(err.message);
  }
};

//create a new todo task.
exports.todo_create_post = async (req, res) => {
  const page = +req.query.page || 1;
  const sort = +req.query.sort || 1;
  try {
    const task = new Task({
      todoName: req.body.todoName.trim(""),
    });
    await task.save();
    res.redirect("back");
  } catch (err) {
    const totalTasks = await Task.countDocuments();
    const limitPerPage = 2;
    const totalPages = Math.ceil(totalTasks / limitPerPage);
    const dataToShow = limitPerPage * page;
    const Tasks = await Task.find().limit(dataToShow).sort({ date: sort });
    const error = err.errors.todoName;
    res.render("index.ejs", {
      Tasks,
      page,
      sort,
      totalTasks,
      totalPages,
      limitPerPage,
      dataToShow,
      message: error,
    });
  }
};

//Display todos on edit
exports.todo_list_edit = async (req, res) => {
  const id = req.params.id;
  const page = +req.query.page || 1;
  const sort = +req.query.sort || 1;
  try {
    const totalTasks = await Task.countDocuments();
    const limitPerPage = 2;
    const totalPages = Math.ceil(totalTasks / limitPerPage);
    const dataToShow = limitPerPage * page;
    const Tasks = await Task.find().limit(dataToShow).sort({ date: sort });
    res.render("editTodo.ejs", {
      Tasks,
      taskId: id,
      page,
      sort,
      totalTasks,
      totalPages,
      limitPerPage,
      dataToShow,
      message: "",
    });
  } catch (err) {
    if (err) return res.send(err.message);
  }
};

// Update a todo task
exports.todo_update_post = async (req, res) => {
  const id = req.params.id;
  const page = +req.query.page || 1;
  const sort = +req.query.sort || 1;
  try {
    await Task.updateOne(
      { _id: req.params.id },
      { todoName: req.body.todoName.trim("") },
      { runValidators: true }
    );
    res.redirect(`/?page=${page}&sort=${sort}`);
  } catch (err) {
    const totalTasks = await Task.countDocuments();
    const limitPerPage = 2;
    const totalPages = Math.ceil(totalTasks / limitPerPage);
    const dataToShow = limitPerPage * page;
    const Tasks = await Task.find().limit(dataToShow).sort({ date: sort });
    const error = err.errors.todoName;
    res.render("editTodo.ejs", {
      Tasks,
      taskId: id,
      page,
      sort,
      totalTasks,
      totalPages,
      limitPerPage,
      dataToShow,
      message: error,
    });
  }
};

// Todo is completed or not completed
exports.todo_done = async (req, res) => {
  try {
    await Task.updateOne({ _id: req.params.id }, { $set: { isDone: true } });
    res.redirect("back");
  } catch (err) {
    if (err) return res.send(err.message);
  }
};
exports.todo_not_done = async (req, res) => {
  try {
    await Task.updateOne({ _id: req.params.id }, { $set: { isDone: false } });
    res.redirect("back");
  } catch (err) {
    if (err) return res.send(err.message);
  }
};

// Delete a todo task
exports.todo_delete = async (req, res) => {
  const id = req.params.id;
  try {
    await Task.deleteOne({ _id: id });
    res.redirect("/");
  } catch (err) {
    if (err) return res.send(err.message);
    res.redirect("/");
  }
};

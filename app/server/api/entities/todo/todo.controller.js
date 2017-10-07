import Todo from './todo.model';

export async function getTodos(req, res, next) {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (e) {
    res.status(500);
    next(e);
  }
}

export async function getTodo(req, res, next) {
  try {
    const todo = await Todo.findById(req.params.id);
    res.json(todo);
  } catch (e) {
    res.status(500);
    next(e);
  }
}

export async function addTodo(req, res, next) {
  try {
    const newTodo = await Todo.create(req.body);
    res.json(newTodo);
  } catch (e) {
    res.status(500);
    next(e);
  }
}

export async function deleteTodo(req, res, next) {
  try {
    await Todo.findByIdAndRemove(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (e) {
    res.status(500);
  }
}

// TODO: Here

export async function toggleTodo(req, res, next) {
  try {
    const toggledTodo = await Todo.findByIdAndToggle(req.params.id);

    res.json({ todo: toggledTodo });
  } catch (e) {
    res.status(500);
  }
}

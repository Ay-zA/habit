import Todo from '@/api/models/todo.model';

export function getTodos(req, res, next) {
  Todo
    .find()
    .then(todos => res.json({ todos }))
    .catch(err => {
      res.status(500);
      return next(err);
    });
}

export function addTodo(req, res, next) {
  if (!req.body || !req.body.title) {
    res.status(400);
    return next(new Error('AddTodoController: Bad Data'));
  }

  const newTodo = new Todo(req.body);

  newTodo
    .save()
    .then(saved => res.json({ todo: saved }))
    .catch(err => {
      res.status(500);
      return next(err);
    });
}

export function deleteTodo(req, res, next) {

}

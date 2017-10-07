import ApiService from './api.service';

export default class TodosService extends ApiService {
  getTodos = () => this.apiGet('todos');
  removeTodo = _id => this.apiRemove(`todos/${_id}`);
  addTodo = todo => this.apiPost('todos', todo);
  toggleTodo = _id => this.apiPatch(`todos/${_id}/toggle`);
}

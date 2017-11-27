import ApiService from './api.service';

export default class CourseService {
  static getTodos = () => ApiService.get('todos');
  static addTodo = todo => ApiService.post('todos', todo);
  static removeTodo = id => ApiService.remove(`todos/${id}`);
  static toggleTodo = id => ApiService.patch(`todos/${id}/toggle`);
}

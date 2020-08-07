import { Injectable, Injector } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Todo } from 'src/app/clases/Todo';
import { TODO_JPA_API_URL } from 'src/app/app.constants';

@Injectable({
  providedIn: 'root',
})
export class TodoDataService {
  constructor(private http: HttpClient, injector: Injector) {}

  retrieveAllTodos(username: String) {
    return this.http.get<Todo[]>(`${TODO_JPA_API_URL}/users/${username}/todos`);
  }

  deleteTodoById(username: string, id: number) {
    return this.http.delete(`${TODO_JPA_API_URL}/users/${username}/todos/${id}`);
  }

  retrieveTodoById(username: string, id: number) {
    return this.http.get<Todo>(
      `${TODO_JPA_API_URL}/users/${username}/todos/${id}`
    );
  }

  updateTodoById(username: string, id: number, todo: Todo) {
    return this.http.put<Todo>(
      `${TODO_JPA_API_URL}/users/${username}/todos/${id}`,
      todo
    );
  }

  createTodo(username: string, todo: Todo) {
    return this.http.post<Todo>(
      `${TODO_JPA_API_URL}/users/${username}/todos`,
      todo
    );
  }
}

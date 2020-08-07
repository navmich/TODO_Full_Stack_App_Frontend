import { Component, OnInit, Injector } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { Router } from '@angular/router';
import { FormArray, FormBuilder } from '@angular/forms';
import { AUTHENTICATED_USER } from '../service/basic-authentication.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { TodoDialogComponent } from '../todo/dialog/todo-dialog/todo-dialog.component';

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css'],
})
export class ListTodosComponent implements OnInit {
  todos: FormArray = new FormArray([]);
  name: string;
  todoDataService: TodoDataService;
  messageDeleted: string;
  messageAllDone: string;
  matDialog: MatDialog;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    injector: Injector
  ) {
    this.todoDataService = injector.get(TodoDataService);
    this.matDialog = injector.get(MatDialog);
  }

  ngOnInit() {
    this.todos = this.fb.array([]);
    this.name = sessionStorage.getItem(AUTHENTICATED_USER);
    this.refreshTodos();
  }

  refreshTodos() {
    this.todoDataService.retrieveAllTodos(this.name).subscribe((response) => {
      if (!response.length) {
        this.messageAllDone = 'You have just finished all Your tasks...';
        setTimeout(() => {
          this.messageAllDone = '';
        }, 5000);
      }
      this.todos = this.fb.array([]);
      for (let todo of response) {
        this.todos.push(this.fb.control(todo));
      }
    });
  }

  deleteTodo(id: number, title: string) {
    this.todoDataService.deleteTodoById(this.name, id).subscribe(() => {
      this.messageDeleted = `Todo: "${title}" was deleted!`;
      setTimeout(() => {
        this.messageDeleted = '';
      }, 2000);
      this.refreshTodos();
    });
  }

  updateTodo(id: number) {
    this.router.navigate(['todos', id]);
  }

  addTodo() {
    this.router.navigate(['todos', -1]);
  }

  addTodoDialog() {
    this.openDialog(-1);
  }

  openDialog(todoId: number) {
    const dialogConfig = new MatDialogConfig();
    // nemuze zavrit dialog kliknutim mimo dialog
    dialogConfig.disableClose = true;
    dialogConfig.data = todoId;
    dialogConfig.minWidth = '40%';

    this.matDialog
      .open(TodoDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe(() => this.refreshTodos());
  }
}

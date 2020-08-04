import { Component, OnInit, Injector, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { TodoDataService } from 'src/app/service/data/todo-data.service';
import { AUTHENTICATED_USER } from 'src/app/service/basic-authentication.service';
import { formatDate } from '@angular/common';
import { Todo } from '../../../clases/Todo';
import { validateTargetDate } from 'src/app/utils/validator.utils';

@Component({
  selector: 'app-todo-dialog',
  templateUrl: './todo-dialog.component.html',
  styleUrls: ['./todo-dialog.component.css'],
})
export class TodoDialogComponent implements OnInit {
  fg: FormGroup;
  id: number;
  username: string;
  todo: Todo;
  todoDataService: TodoDataService;

  TODAYS_DATE = formatDate(Date.now(), 'yyyy-MM-dd', 'en-US');
  INVALID_TITLE = 'Title is required';
  INVALID_TARGET_DATE = 'Enter date in valid format';

  constructor(
    injector: Injector,
    private fb: FormBuilder,
    public readonly dialogRef: MatDialogRef<TodoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number
  ) {
    this.todoDataService = injector.get(TodoDataService);
  }

  ngOnInit() {
    this.dialogRef.keydownEvents().subscribe((event) => {
      if (event.key === 'Escape') {
        this.onCancel();
      }
    });

    this.fg = this.fb.group({
      id: [''],
      username: [''],
      title: ['', Validators.required],
      description: [''],
      targetDate: ['', [Validators.required, validateTargetDate()]],
      done: [''],
    });
    // TODO list do async
    this.fg.valueChanges.subscribe(() => {});

    this.id = this.data;
    this.todo = new Todo(this.id, '', '', false, new Date());
    this.username = sessionStorage.getItem(AUTHENTICATED_USER);
    if (this.id != -1) {
      this.retrieveTodoById();
    }
  }

  onSubmit() {
    if (!this.isFormInvalid()) {
      this.saveTodo();
    }
  }

  onCancel() {
    this.dialogRef.close();
  }

  isFormInvalid() {
    return this.fg.invalid;
  }

  retrieveTodoById() {
    this.todoDataService
      .retrieveTodoById(this.username, this.id)
      .subscribe((response) => {
        this.todo = response;
        this._setFormGroup(this.todo);
      });
  }

  saveTodo() {
    if (this.id == -1) {
      this._setTodo();
      this.todoDataService
        .createTodo(this.username, this.todo)
        .subscribe(() => {
          this.dialogRef.close();
        });
    } else if (!this.fg.dirty) {
      this.onCancel();
    } else {
      this.todoDataService
        .updateTodoById(this.username, this.id, this.fg.value)
        .subscribe(() => {
          this.dialogRef.close();
        });
    }
  }

  pickUpWarningMessage() {
    if (this.fg.controls.title.invalid) {
      return this.INVALID_TITLE;
    } else if (
      this.fg.controls.targetDate.invalid &&
      this.fg.controls.targetDate.hasError('error.targetDate.isBeforeNow')
    ) {
      return this.fg.controls.targetDate.getError(
        'error.targetDate.isBeforeNow'
      ).text;
    } else if (this.fg.controls.targetDate.invalid) {
      return this.INVALID_TARGET_DATE;
    } else {
      return null;
    }
  }

  private _setFormGroup(todo: Todo) {
    this.fg.get('id').setValue(todo.id);
    this.fg.get('username').setValue(this.username);
    this.fg.get('title').setValue(todo.title);
    this.fg.get('description').setValue(todo.description);
    this.fg
      .get('targetDate')
      .setValue(formatDate(todo.targetDate, 'yyyy-MM-dd', 'en-US'));
    this.fg.get('done').setValue(todo.done);
  }

  private _setTodo() {
    this.todo.title = this.fg.get('title').value;
    this.todo.description = this.fg.get('description').value;
    this.todo.targetDate = this.fg.get('targetDate').value;
    this.todo.done = false;
  }
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ITodo } from '../interfaces/todo.interface';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-todo',
  templateUrl: './add-todo.component.html',
  styleUrl: './add-todo.component.scss',
})
export class AddTodoComponent implements OnInit {
  todoForm!: FormGroup;
  id = '';
  isEdit = false;

  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.initializeForm();

    if (id) {
      this.isEdit = true;
      this.id = id;
      this.getTodoById(id);
    }
  }

  initializeForm() {
    this.todoForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      completed: [false],
    });
  }

  async addTodo() {
    try {
      if (this.todoForm.valid) {
        const newTodo: ITodo = this.todoForm.value;
        await this.apiService.create<ITodo>('todo', newTodo);
        this.resetForm();
      }
    } catch (error) {
      console.error('Error while saving!', error);
      throw error;
    }
  }

  async updateTodo() {
    try {
      if (this.todoForm.valid) {
        const newTodo: ITodo = this.todoForm.value;
        await this.apiService.update<ITodo>('todo', this.id, newTodo);
        this.router.navigate([`/todo-list`]);
      }
    } catch (error) {
      console.error('Error while updating!', error);
      throw error;
    }
  }

  async getTodoById(id: string) {
    try {
      const { title, description, completed } = await this.apiService.getById<ITodo>('todo', id);
      this.todoForm.setValue({ title, description, completed });
    } catch (error) {
      console.error('Error while fetching!', error);
      throw error;
    }
  }

  resetForm() {
    this.todoForm.reset({ title: '', description: '', completed: false });
  }
}

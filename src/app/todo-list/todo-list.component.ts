import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ITodo } from '../interfaces/todo.interface';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.scss',
})
export class TodoListComponent implements OnInit {
  todo!: ITodo[];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.getTodo();
  }

  async getTodo() {
    try {
      this.todo = await this.apiService.get<ITodo[]>('todo');
    } catch (error) {
      console.error('Error while fetching!', error);
      throw error;
    }
  }

  async deleteTodo(id: string) {
    try {
      await this.apiService.delete('todo', id);
      await this.getTodo();
    } catch (error) {
      console.error('Error while deleting!', error);
      throw error;
    }
  }
}

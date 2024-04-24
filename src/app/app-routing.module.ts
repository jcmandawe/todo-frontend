import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddTodoComponent } from './add-todo/add-todo.component';
import { TodoListComponent } from './todo-list/todo-list.component';

const routes: Routes = [
  { path: '', redirectTo: 'todo-list', pathMatch: 'full' },
  { path: 'todo-list', component: TodoListComponent },
  { path: 'add-todo', component: AddTodoComponent },
  { path: 'edit-todo/:id', component: AddTodoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

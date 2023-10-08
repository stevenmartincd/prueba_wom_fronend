// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login.component';
import { AuthGuard } from './services/auth.guard';
import {TaskComponent} from "./task/tasks/task.component";
import {AddTaskComponent} from "./task/task-create/task-create.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'taskcreate', component: AddTaskComponent, canActivate: [AuthGuard] },
  { path: 'task', component: TaskComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

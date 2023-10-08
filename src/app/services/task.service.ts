import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../model/task.model';
import { environment } from '../../environments/environment';
import { TokenService } from "./token.service";
import {UpdateTaskStatusRequest} from "../model/UpdateTaskStatusRequest";

@Injectable({
    providedIn: 'root'
})
export class TaskService {

    private baseUrl = environment.apiResrURL + '/api/tasks';

    constructor(private http: HttpClient, private tokenService: TokenService) { }

    private getHeaders(): HttpHeaders {
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.tokenService.getToken()
        });
    }

    createTask(task: Task): Observable<Task> {
        return this.http.post<Task>(`${this.baseUrl}/create`, task, { headers: this.getHeaders() });
    }

    getTasksByUserId(idUser: number): Observable<Task[]> {
        return this.http.get<Task[]>(`${this.baseUrl}/listUser/${idUser}`, { headers: this.getHeaders() });
    }

    updateTask(id: number, task: Task): Observable<Task> {
        return this.http.put<Task>(`${this.baseUrl}/update/${id}`, task, { headers: this.getHeaders() });
    }

    deleteTask(id: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/delete/${id}`, { headers: this.getHeaders() });
    }
    updateTasksStatus(request: UpdateTaskStatusRequest): Observable<void> {
        return this.http.post<void>(`${this.baseUrl}/update-status`, request, { headers: this.getHeaders() });
    }
  deleteTasksMassive(taskIds: number[]): Observable<void> {
    const options = {
      headers: this.getHeaders(),
      body: taskIds
    };
    return this.http.delete<void>(`${this.baseUrl}/delete-massive`, options);
  }

}

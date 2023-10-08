import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  subject = new BehaviorSubject<any>('null');

  public getMessage(): Observable<any> {
    return this.subject.asObservable();
  }

  constructor() { }
}

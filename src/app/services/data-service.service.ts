import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private dataSource = new BehaviorSubject<string>("");
  currentData = this.dataSource.asObservable();

  constructor() { }

  setData(data: string) {
    this.dataSource.next(data);
  }

  private myObject: any;

  setObject(obj: any): void {
    this.myObject = obj;
  }

  getObject(): any {
    return this.myObject;
  }

}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private dataSource = new BehaviorSubject<any>(null);
  currentData = this.dataSource.asObservable();

  constructor() { }

  setDataSource(data: any) {
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

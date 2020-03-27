import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';



@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  data;
  observable;

  getUsers() {
    if (this.data) {
      return Observable.of(this.data);
    } else if (this.observable) {
      return this.observable;
    } else {
      this.observable = this.http.get('https://reqres.in/api/users?pagee={page}', {
        observe: 'response'
      })
      .map(response =>  {
        this.observable = null;
        if (response.status === 400) {
          return 'Request failed.';
        } else if (response.status === 200) {
          this.data = response.body;
          return this.data;
        }
      })
      .share();
      return this.observable;
    }
  }
}

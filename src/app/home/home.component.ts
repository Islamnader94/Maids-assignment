import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  users;
  showSpinner = false;
  searchedList : any;

  constructor(
    private data: DataService,
    private router: Router
    ) { }

  ngOnInit() {
    this.refreshList();
  }
  
  refreshList() {
    this.showSpinner = true;
    this.data.getUsers().subscribe(data => {
      let users_list = data['data'];
      this.users = users_list;
      if(this.users != '') {
        this.showSpinner = false;
      }
    })
  }

  viewDetails(user) {
    this.router.navigate(['/details/'] , { state: { value: user } });
  }

  search(value) {
    if ( value != '') {
      this.users = this.users.filter(val=>{
        return String(val['id']).match(value);
      });
    } else {
      this.ngOnInit();
    }
  }
}

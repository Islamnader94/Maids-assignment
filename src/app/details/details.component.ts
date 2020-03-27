import { Component, OnInit } from '@angular/core';
import { Router, Params } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  value:string;
  constructor(private router: Router) {
    const user = this.router.getCurrentNavigation();
    const state = user.extras.state as {value: string};
    this.value = state.value;
   }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { CowinApiService } from '../../services/cowin-api.service';
import {States, Districts} from '../../interfaces/api-data'

@Component({
  selector: 'app-search-by-dist-form',
  templateUrl: './search-by-dist-form.component.html',
  styleUrls: ['./search-by-dist-form.component.css']
})
export class SearchByDistFormComponent implements OnInit {

  statesList: any;
  distList: any;
  selectedState: any;
  selectedDist: any;
  selectedDate: any;

  constructor(private cowin: CowinApiService) { }

  ngOnInit(): void {
    this.selectedDate = new Date();
    this.getStatesList();
  }

  getStatesList() {
    this.cowin.getStateList().forEach(states => {
      this.statesList = (states as States).states;
      console.log(this.statesList)
    })
  }

  getDistricts() {
    this.cowin.getDistForState(+this.selectedState).forEach(dist => {
      this.distList = (dist as Districts).districts;
      console.log(this.distList)
    })
  }

}

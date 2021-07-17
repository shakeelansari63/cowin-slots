import { Component, OnInit } from '@angular/core';
import { CowinApiService } from '../../services/cowin-api.service';
import {States, Districts, DistrictSearchParams} from '../../interfaces/api-data'
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-by-dist-form',
  templateUrl: './search-by-dist-form.component.html',
  styleUrls: ['./search-by-dist-form.component.css']
})
export class SearchByDistFormComponent implements OnInit {

  statesList: any = null;
  distList: any = null;
  selectedState: number = 0;
  selectedDist: number = 0;
  todayDate: Date = new Date();
  selectedDate: any;


  @Output() searchSubmit: EventEmitter<DistrictSearchParams> = new EventEmitter();

  constructor(private cowin: CowinApiService) { }

  ngOnInit(): void {
    this.selectedDate = this.todayDate;
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

  viewSelectedDistrict() {
    console.log(this.selectedDist)
  }

  searchByDist() {
    if (this.selectedDate !== null && this.selectedDist !== 0) {
      const districtParams = {
        district: this.selectedDist,
        dt: this.selectedDate
      }

      this.searchSubmit.emit(districtParams);
    } else {
      alert ("Please select valid district and Date !!!")
    }
  }

}

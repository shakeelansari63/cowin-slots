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
  @Output() resetSlots: EventEmitter<any> = new EventEmitter()

  constructor(private cowin: CowinApiService) { }

  ngOnInit(): void {
    this.selectedDate = this.todayDate;

    // Set States from Api Subscription
    this.cowin.states$.subscribe(states => {
      this.statesList = states;
    });

    // Set Districts from Api Subscription
    this.cowin.district$.subscribe(districts => {
      this.distList = districts;
    });

    // Set States List on Init
    this.getStatesList();
  }

  getStatesList() {
    // Reset Selected State
    this.selectedState = 0;

    // Get List of States
    this.cowin.getStateList();
  }

  getDistricts() {
    // Reset selected District
    this.selectedDist = 0;
    
    // Set District List to empty when state change
    this.cowin.setDistricts([]);

    // Emit Reset Slots List Event
    this.resetSlotsEvent();

    // Get list of Districst
    this.cowin.getDistForState(+this.selectedState);
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

  resetSlotsEvent() {
    this.resetSlots.emit();
  }

}

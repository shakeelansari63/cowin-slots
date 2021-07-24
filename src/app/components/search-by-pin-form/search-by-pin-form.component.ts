import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CowinApiService } from '../../services/cowin-api.service';
import { PincodeSearchParams } from '../../interfaces/api-data'

@Component({
  selector: 'app-search-by-pin-form',
  templateUrl: './search-by-pin-form.component.html',
  styleUrls: ['./search-by-pin-form.component.css']
})
export class SearchByPinFormComponent implements OnInit {

  inPincode: string;
  selectedDate: any;
  todayDate: Date;

  @Output() searchSubmit: EventEmitter<PincodeSearchParams> = new EventEmitter();
  @Output() resetSlots: EventEmitter<any> = new EventEmitter()

  constructor(private cowin: CowinApiService) { }

  ngOnInit(): void {
    // Set Dates
    this.todayDate = new Date();
    this.selectedDate = this.todayDate;

    // Set Input PIncode
    this.inPincode = '';
  }

  searchByPincode() {
    if (this.inPincode !== '') {
      // Make parameters for Pincode API
      const pincodeParam:PincodeSearchParams = {
        pincode: +this.inPincode,
        dt: this.selectedDate
      }

      // Emit Search Event
      this.searchSubmit.emit(pincodeParam);
      
    } else {
      alert('Please enter Pin Code');
    }
  }

  resetSlotsEvent() {
    this.resetSlots.emit();
  }

}

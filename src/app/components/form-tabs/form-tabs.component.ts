import { Component, OnInit } from '@angular/core';
import { DistrictSearchParams, Slots, PincodeSearchParams } from '../../interfaces/api-data';
import { CowinApiService } from '../../services/cowin-api.service';

@Component({
  selector: 'app-form-tabs',
  templateUrl: './form-tabs.component.html',
  styleUrls: ['./form-tabs.component.css']
})
export class FormTabsComponent implements OnInit {

  slotsList: Slots[];

  constructor(private cowin: CowinApiService) { }

  ngOnInit(): void {
    this.slotsList = [];
    
    // Subscribe to Slots List 
    this.cowin.slots$.subscribe(slots => {
      this.slotsList = slots;
    })
  }

  searchByDistrict(evnt: DistrictSearchParams) {
    // Get Slots
    this.cowin.getSlotsByDist(evnt.district, evnt.dt);
  }

  searchByPincode(evnt: PincodeSearchParams) {
    // Get Slots
    this.cowin.getSlotByPincode(evnt.pincode, evnt.dt);
  }

  resetSlots() {
    this.cowin.setSlots([]);
  }

}

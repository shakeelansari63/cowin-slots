import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DistrictSearchParams, Slots, Sessions } from '../../interfaces/api-data';
import { CowinApiService } from '../../services/cowin-api.service';

@Component({
  selector: 'app-form-tabs',
  templateUrl: './form-tabs.component.html',
  styleUrls: ['./form-tabs.component.css']
})
export class FormTabsComponent implements OnInit {

  slotsList: Slots[] = [];

  constructor(private cowin: CowinApiService) { }

  ngOnInit(): void {
  }

  searchByDistrict(evnt: DistrictSearchParams) {
    this.cowin.getSlotsByDist(evnt.district, evnt.dt).forEach(slots => {
      this.slotsList = (slots as Sessions).sessions.filter(session => session.available_capacity > 0);
      console.log(this.slotsList)
    })
  }

}

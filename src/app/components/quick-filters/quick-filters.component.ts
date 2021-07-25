import { Component, OnInit } from '@angular/core';
import { CowinApiService } from '../../services/cowin-api.service';

@Component({
  selector: 'app-quick-filters',
  templateUrl: './quick-filters.component.html',
  styleUrls: ['./quick-filters.component.css']
})
export class QuickFiltersComponent implements OnInit {

  ageFilter: string = null;
  vaccineFilter: string = null;

  constructor(private cowin: CowinApiService) { }

  ngOnInit(): void {
  }

  setAgeFilter() {
    this.cowin.setAgeFilter(+this.ageFilter);
  }

  setVaccineFilter() {
    this.cowin.setVaccineFilter(this.vaccineFilter);
  }

  clearAllFilters() {
    this.ageFilter = '0';
    this.vaccineFilter = '';
    this.setAgeFilter();
    this.setVaccineFilter();
  }

}

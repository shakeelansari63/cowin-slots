import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import {States, State, Districts, District, Sessions, Slots} from '../interfaces/api-data'

@Injectable({
  providedIn: 'root'
})
export class CowinApiService {

  stateMetadata: string = 'https://cdn-api.co-vin.in/api/v2/admin/location/states/';
  distMetadata: string = 'https://cdn-api.co-vin.in/api/v2/admin/location/districts';
  distSlots: string = 'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict';
  pinSlots: string = 'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin';

  ageFilter: number;
  vaccineFilter: string;
  currentSlots: Slots[];

  apiLoading: Subject<boolean>;
  apiLoading$: Observable<boolean>;

  stateList: Subject<State[]>;
  states$: Observable<State[]>;

  districtList: Subject<District[]>;
  district$: Observable<District[]>;

  slotsList: Subject<Slots[]>;
  slots$: Observable<Slots[]>;

  constructor(private http: HttpClient) { 
    // Set default value
    this.ageFilter = null;
    this.vaccineFilter = null;

    // Create new subjects
    this.apiLoading = new Subject();
    this.stateList = new Subject();
    this.districtList = new Subject();
    this.slotsList = new Subject();

    // Create Observable for ApiLoading Subject
    this.apiLoading$ = this.apiLoading.asObservable();
    this.states$ = this.stateList.asObservable();
    this.district$ = this.districtList.asObservable();
    this.slots$ = this.slotsList.asObservable();

    // Set Initial value to False
    this.apiLoading.next(false)
  }

  getStateList() {
   this.http.get(this.stateMetadata).subscribe(states => {
     this.stateList.next((states as States).states)
    })
  }

  getDistForState(stateId: number) {
    this.http.get(`${this.distMetadata}/${stateId}`).subscribe(districts => {
      this.districtList.next((districts as Districts).districts)
    })
  }

  setDistricts(dist: District[]) {
    this.districtList.next(dist);
  }

  formatDate(slotDt: Date) : string {
    // Make date in Required Format DD-MM-YYYY
    const dd: string = slotDt.getDate() < 10 ? '0' + slotDt.getDate() : slotDt.getDate().toString()
    const mm: string = slotDt.getMonth() + 1 < 10 ? '0' + (slotDt.getMonth() + 1) : (slotDt.getMonth() + 1).toString()
    const yyyy: string = slotDt.getFullYear().toString()

    const slotDate = `${dd}-${mm}-${yyyy}`

    return slotDate
  }

  getAvailableSlots(url: string, params: HttpParams) { 
    // Empty Current Slots Content
    this.setSlots([]);

    // Set API Loading State to True
    this.apiLoading.next(true);

    // MAke API Call
    this.http.get(url, {params: params}).subscribe(slots => {
      this.currentSlots = (slots as Sessions).sessions
                        .filter(session => session.available_capacity > 0)
                        .sort((itm1, itm2) => {
                          return itm1.name > itm2.name ? 1 
                                    : itm1.name < itm2.name ? -1 
                                    : itm1.vaccine > itm2.vaccine ? 1
                                    : itm1.vaccine < itm2.vaccine ? -1
                                    : itm1.min_age_limit > itm2.min_age_limit ? 1
                                    : itm1.min_age_limit < itm2.min_age_limit ? -1
                                    : 0
                        })

      // Filter as per quick Filters
      this.quickFilterSlots();

      // Reset AP Loading Status
      this.apiLoading.next(false);
    })

  }

  quickFilterSlots() {
    if (this.currentSlots) {
      let filteredSlots: Slots[] = this.currentSlots;

      if (this.ageFilter !== null && this.ageFilter !== 0) {
        filteredSlots = filteredSlots.filter(slots => slots.min_age_limit == this.ageFilter)
      } 
      if (this.vaccineFilter !== null && this.vaccineFilter !== '') {
        filteredSlots = filteredSlots.filter(slots => slots.vaccine === this.vaccineFilter)
      }

      // check if data is filtered and set the slots list accordingly
      this.slotsList.next(filteredSlots);
    }
  }

  getSlotsByDist(distId: number, slotDt: Date) {
    // Get Formatted Date
    const slotDate = this.formatDate(slotDt)

    // Make Http Parameters
    const slotParam = new HttpParams()
        .set('district_id', distId.toString())
        .set('date', slotDate)

    // Find Slots with API
    this.getAvailableSlots(this.distSlots, slotParam)
  }

  setSlots(sl: Slots[]) {
    this.currentSlots = sl;
    this.slotsList.next(this.currentSlots);
  }

  getSlotByPincode(pincode: number, slotDt: Date) {
    // Get Formatted Date
    const slotDate = this.formatDate(slotDt)

    // Make HTTP Paramenters
    const slotParam = new HttpParams()
        .set('pincode', pincode.toString())
        .set('date', slotDate)

    // Make API Call
    this.getAvailableSlots(this.pinSlots, slotParam)
  }

  setApiLoadingState(state: boolean) {
    this.apiLoading.next(state)
  } 

  setAgeFilter(val: number) {
    this.ageFilter = val;
    this.quickFilterSlots();
  }

  setVaccineFilter(val: string) {
    this.vaccineFilter = val;
    this.quickFilterSlots();
  }
}

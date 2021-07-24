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
  pinSlots: string = 'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin'

  apiLoading: Subject<boolean>;
  apiLoading$: Observable<boolean>;

  stateList: Subject<State[]>;
  states$: Observable<State[]>;

  districtList: Subject<District[]>;
  district$: Observable<District[]>;

  slotsList: Subject<Slots[]>;
  slots$: Observable<Slots[]>;

  constructor(private http: HttpClient) { 
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
    // Set API Loading State to True
    this.apiLoading.next(true);

    // MAke API Call
    this.http.get(url, {params: params}).subscribe(slots => {
      const foundSlots = (slots as Sessions).sessions
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
      // Set Slots
      this.slotsList.next(foundSlots)

      // Reset AP Loading Status
      this.apiLoading.next(false);
    })

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
    this.slotsList.next(sl);
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
}

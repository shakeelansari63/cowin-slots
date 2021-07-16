import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class CowinApiService {

  stateMetadata: string = 'https://cdn-api.co-vin.in/api/v2/admin/location/states/';
  distMetadata: string = 'https://cdn-api.co-vin.in/api/v2/admin/location/districts';
  distSlots: string = 'https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict';

  constructor(private http: HttpClient) { }

  getStateList() {
   return this.http.get(this.stateMetadata);
  }

  getDistForState(stateId: number) {
    return this.http.get(`${this.distMetadata}/${stateId}`);
  }

  getSlotsByDist(distId: number, slotDt: Date) {

  }

  getSlotByPincode(pincode: number) {
    
  }
}

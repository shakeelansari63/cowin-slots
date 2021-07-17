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

    const dd: string = slotDt.getDate() < 10 ? '0' + slotDt.getDate() : slotDt.getDate().toString()
    const mm: string = slotDt.getMonth() + 1 < 10 ? '0' + (slotDt.getMonth() + 1) : (slotDt.getMonth() + 1).toString()
    const yyyy: string = slotDt.getFullYear().toString()

    const slotDate = `${dd}-${mm}-${yyyy}`

    const slotParam = new HttpParams()
        .set('district_id', distId.toString())
        .set('date', slotDate)
    return this.http.get(this.distSlots, {params: slotParam})
  }

  getSlotByPincode(pincode: number) {
    
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { Slots } from '../../interfaces/api-data';
import { CowinApiService } from '../../services/cowin-api.service';

@Component({
  selector: 'app-slots-list',
  templateUrl: './slots-list.component.html',
  styleUrls: ['./slots-list.component.css']
})
export class SlotsListComponent implements OnInit {

  @Input() slots: Slots[] = [];
  apiLoading: boolean;

  constructor( private cowin: CowinApiService) { }

  ngOnInit(): void {
    this.cowin.apiLoading$.subscribe(state => this.apiLoading = state);
  }
}

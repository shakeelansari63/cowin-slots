import { Component, OnInit, Input } from '@angular/core';
import { Slots } from '../../interfaces/api-data';

@Component({
  selector: 'app-slot-detail',
  templateUrl: './slot-detail.component.html',
  styleUrls: ['./slot-detail.component.css']
})
export class SlotDetailComponent implements OnInit {

  @Input() slot: Slots;

  constructor() { }

  ngOnInit(): void {
  }

}

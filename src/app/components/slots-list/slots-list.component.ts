import { Component, OnInit, Input } from '@angular/core';
import { Slots } from '../../interfaces/api-data';

@Component({
  selector: 'app-slots-list',
  templateUrl: './slots-list.component.html',
  styleUrls: ['./slots-list.component.css']
})
export class SlotsListComponent implements OnInit {

  @Input() slots: Slots[];

  constructor() { }

  ngOnInit(): void {
  }

}

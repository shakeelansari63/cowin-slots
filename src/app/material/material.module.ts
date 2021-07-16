// This module only deals with importing and exporting material componnets for all
import { NgModule } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTabsModule} from '@angular/material/tabs';

const MaterialComponents = [
  MatToolbarModule,
  MatIconModule,
  MatButtonModule,
  MatTabsModule
];

@NgModule({
  imports: [
    MaterialComponents
  ], exports: [
    MaterialComponents
  ]
})
export class MaterialModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module'
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormTabsComponent } from './components/form-tabs/form-tabs.component';
import { SearchByDistFormComponent } from './components/search-by-dist-form/search-by-dist-form.component';
import { SearchByPinFormComponent } from './components/search-by-pin-form/search-by-pin-form.component';
import { QuickFiltersComponent } from './components/quick-filters/quick-filters.component';
import { SlotDetailComponent } from './components/slot-detail/slot-detail.component';
import { SlotsListComponent } from './components/slots-list/slots-list.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    FormTabsComponent,
    SearchByDistFormComponent,
    SearchByPinFormComponent,
    QuickFiltersComponent,
    SlotDetailComponent,
    SlotsListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

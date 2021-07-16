import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchByPinFormComponent } from './search-by-pin-form.component';

describe('SearchByPinFormComponent', () => {
  let component: SearchByPinFormComponent;
  let fixture: ComponentFixture<SearchByPinFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchByPinFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchByPinFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotsListComponent } from './slots-list.component';

describe('SlotsListComponent', () => {
  let component: SlotsListComponent;
  let fixture: ComponentFixture<SlotsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlotsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlotsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

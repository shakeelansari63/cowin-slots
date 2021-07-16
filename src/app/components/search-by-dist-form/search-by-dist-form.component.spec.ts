import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchByDistFormComponent } from './search-by-dist-form.component';

describe('SearchByDistFormComponent', () => {
  let component: SearchByDistFormComponent;
  let fixture: ComponentFixture<SearchByDistFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchByDistFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchByDistFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectLocationComponent } from './select-location.component';
import { ActivatedRoute, Router } from '@angular/router';

describe('SelectLocationComponent', () => {
  let component: SelectLocationComponent;
  let fixture: ComponentFixture<SelectLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectLocationComponent],
      providers: [
        { provide: Router, useValue: { navigate: () => {}, getCurrentNavigation: () => ({ extras: { state: null } }) } },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => 'car' } } } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

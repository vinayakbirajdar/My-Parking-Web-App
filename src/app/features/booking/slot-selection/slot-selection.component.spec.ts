import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SlotSelectionComponent } from './slot-selection.component';
import { ActivatedRoute, Router } from '@angular/router';

describe('SlotSelectionComponent', () => {
  let component: SlotSelectionComponent;
  let fixture: ComponentFixture<SlotSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlotSelectionComponent],
      providers: [
        { provide: Router, useValue: { navigate: () => {}, getCurrentNavigation: () => ({ extras: { state: null } }) } },
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => 'car' } } } }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SlotSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

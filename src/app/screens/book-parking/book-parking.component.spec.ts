import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookParkingComponent } from './book-parking.component';
import { ActivatedRoute, Router } from '@angular/router';

describe('BookParkingComponent', () => {
  let component: BookParkingComponent;
  let fixture: ComponentFixture<BookParkingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookParkingComponent],
      providers: [
        { provide: Router, useValue: { navigate: () => {} } },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => 'car' } }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BookParkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentComponent } from './payment.component';
import { Router } from '@angular/router';

describe('PaymentComponent', () => {
  let component: PaymentComponent;
  let fixture: ComponentFixture<PaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentComponent],
      providers: [{ provide: Router, useValue: { navigate: () => {}, getCurrentNavigation: () => ({ extras: { state: null } }) } }]
    }).compileComponents();
    fixture = TestBed.createComponent(PaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

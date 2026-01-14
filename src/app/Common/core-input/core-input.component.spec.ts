import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { CommonInputComponent } from './core-input.component';

describe('CommonInputComponent', () => {
  let component: CommonInputComponent;
  let fixture: ComponentFixture<CommonInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CommonInputComponent, ReactiveFormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommonInputComponent);
    component = fixture.componentInstance;
    // Provide a FormControl as required by the component
    component.control = new FormControl('');
    component.placeholder = 'Test placeholder';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

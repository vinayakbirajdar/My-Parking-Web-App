import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoreTitleComponent } from './core-title.component';

describe('CoreTitleComponent', () => {
  let component: CoreTitleComponent;
  let fixture: ComponentFixture<CoreTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoreTitleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoreTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

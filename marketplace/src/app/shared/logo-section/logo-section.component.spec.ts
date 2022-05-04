import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoSectionComponent } from './logo-section.component';

describe('LogoSectionComponent', () => {
  let component: LogoSectionComponent;
  let fixture: ComponentFixture<LogoSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogoSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePostViewComponent } from './profile-post-view.component';

describe('ProfilePostViewComponent', () => {
  let component: ProfilePostViewComponent;
  let fixture: ComponentFixture<ProfilePostViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfilePostViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfilePostViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

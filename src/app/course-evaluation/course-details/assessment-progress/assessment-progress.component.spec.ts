import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentProgressComponent } from './assessment-progress.component';

describe('AssessmentProgressComponent', () => {
  let component: AssessmentProgressComponent;
  let fixture: ComponentFixture<AssessmentProgressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssessmentProgressComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

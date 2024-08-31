import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCardSkeletonComponent } from './task-card-skeleton.component';

describe('TaskCardSkeletonComponent', () => {
  let component: TaskCardSkeletonComponent;
  let fixture: ComponentFixture<TaskCardSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskCardSkeletonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaskCardSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

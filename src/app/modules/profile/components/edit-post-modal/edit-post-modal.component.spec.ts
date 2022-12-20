import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPostModalComponent } from './edit-post-modal.component';

describe('EditPostModalComponent', () => {
  let component: EditPostModalComponent;
  let fixture: ComponentFixture<EditPostModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPostModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditPostModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

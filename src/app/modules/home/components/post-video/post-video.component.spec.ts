import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostVideoComponent } from './post-video.component';

describe('PostVideoComponent', () => {
  let component: PostVideoComponent;
  let fixture: ComponentFixture<PostVideoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostVideoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

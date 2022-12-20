import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostBlogComponent } from './post-blog.component';

describe('PostBlogComponent', () => {
  let component: PostBlogComponent;
  let fixture: ComponentFixture<PostBlogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostBlogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostBlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

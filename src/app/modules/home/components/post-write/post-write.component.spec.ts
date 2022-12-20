import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostWriteComponent } from './post-write.component';

describe('PostWriteComponent', () => {
  let component: PostWriteComponent;
  let fixture: ComponentFixture<PostWriteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostWriteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostWriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import {Component, OnInit} from '@angular/core';
import {PostService} from "../../services/post.service";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {
  html: any
  try: any

  constructor(private postService: PostService, private sanitizer: DomSanitizer) {
  }

  async ngOnInit() {
    return this.postService.getBlogs().then((data) => {
      this.html = data.map((item: any) => {
        item.html = this.sanitizeHtml(item.html);

        return item;
      });
    })
  }

  sanitizeHtml(html: string) {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

}

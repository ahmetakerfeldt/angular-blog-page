import { Component, OnInit } from '@angular/core';
import {AngularEditorConfig} from "@kolkov/angular-editor/lib/config";
import {FormBuilder, Validators} from "@angular/forms";
import {PostService} from "../../../posts/services/post.service";







@Component({

  selector: 'app-post-blog',
  templateUrl: './post-blog.component.html',
  styleUrls: ['./post-blog.component.scss']
})
export class PostBlogComponent implements OnInit {
  inputForm = this.fb.group({
    html: ['', Validators.required]
  })
  htmlContent = ''
  editorConfig: AngularEditorConfig = {
    editable: true,
    sanitize: false,
    spellcheck: true,
    height: '400px',
    minHeight: '400',
    maxHeight: '590px',
    width: '100%',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: false,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '3px',
    outline: false,
    rawPaste: false,
    toolbarPosition: "top",
    toolbarHiddenButtons: [['Insert Video']]

  }


  constructor(private fb: FormBuilder, private postService: PostService) {}

  ngOnInit(): void {
  }

  async shareBlog() {
    const {value} = this.inputForm
    if (value.html == '' || undefined || null) {
      return;
    }
    return this.postService.shareBlog({
      html: value.html
    })
  }
}

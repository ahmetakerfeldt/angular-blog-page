import {Component, HostListener, OnInit} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  width: any

  constructor() {
  }

  ngOnInit(): void {
    this.width = window.innerWidth;
    window.onscroll = (event) => {
      const navbar = document.getElementById('navbar');

      if (!navbar) return;

      if (window.scrollY === 0) {
        navbar.classList.remove('sticky');
        return;
      }

      if (navbar.classList.contains('sticky')) return;

      navbar.classList.add('sticky');
    }

  }

  @HostListener('window:resize', ['$event'])


  onResize($event: any) {
    this.width = window.innerWidth;
    console.log(innerWidth)
  }


}

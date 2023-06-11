import {Component, ElementRef, OnInit} from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 's-slider',
  templateUrl: './carousel-slider.component.html',
  styleUrls: ['./carousel-slider.component.scss']
})

export class CarouselSliderComponent implements OnInit {
  carouselData =  [
    { text: 'Slide 1 PM', src: 'assets/images/350x450&text=1.png', dataMerge: 2, width: 300, dotContent: 'text1'},
    { text: 'Slide 2 PM', src: 'assets/images/350x450&text=1.png', dataMerge: 1, width: 500, dotContent: 'text2'},
    { text: 'Slide 3 PM', src: 'assets/images/350x450&text=1.png', dataMerge: 3, dotContent: 'text3'},
    { text: 'Slide 4 PM', src: 'assets/images/350x450&text=1.png', width: 450, dotContent: 'text4'},
    { text: 'Slide 5 PM', src: 'assets/images/350x450&text=1.png', dataMerge: 2, dotContent: 'text5'},
  ];
  title = 'owl-carousel-libdemo';
  owlNext = '&rarr;';
  owlPrev = '&larr;';


  customOptions: OwlOptions = {
   // autoWidth: false,

    loop: true,
    // items: '10',
    // margin: 10,
    // slideBy: 'page',
    // merge: true,
    autoplay: false,
    autoplayTimeout: 3000,
    // autoplayHoverPause: true,
    autoplaySpeed: 2000,
    dotsSpeed: 500,
    // dots: false,
    // dotsData: true,
    // mouseDrag: false,
    // touchDrag: false,
    // pullDrag: false,
    smartSpeed: 400,
    // fluidSpeed: 499,
    dragEndSpeed: 350,
    // dotsEach: 4,
    // center: true,
    // rewind: true,
    // rtl: true,
    // startPosition: 1,
    // navText: [ '<i class=fa-chevron-left>left</i>', '<i class=fa-chevron-right>right</i>' ],
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 2
      },
      900: {
        items: 3
      }
    },
    // stagePadding: 40,
    nav: true
  }
  activeSlides: any;

  constructor(private el: ElementRef) { }

  ngOnInit() {
  }

  getPassedData(data: any) {
    this.activeSlides = data;
    // console.log(this.activeSlides);
  }





}

import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective implements OnInit {
  @Input() appHighlight = ''; 
  @Input() defaultColor = ''; 
  
  constructor(private el: ElementRef) { }

  ngOnInit() {
    this.setDefaultColor();
  }

  private setDefaultColor() {
    this.el.nativeElement.style.transition = 'background-color 0.3s';
    this.el.nativeElement.style.backgroundColor = this.defaultColor || 'transparent';
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.highlight(this.appHighlight || '#f0f0f0');
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(this.defaultColor || 'transparent');
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
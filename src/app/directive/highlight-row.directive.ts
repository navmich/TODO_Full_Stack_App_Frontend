import {
  Directive,
  Input,
  ElementRef,
  HostListener,
  OnInit,
} from '@angular/core';
import * as moment from 'moment';

/**
 * Meni barvu pozadi elementu v zavislosti na datu.
 * Meni tloustku pisma pri najeti mysi.
 * @param
 * @author Michal Navratil
 */
@Directive({
  selector: '[appHighlightRow]',
})
export class HighlightRowDirective implements OnInit {
  @Input('appHighlightRow') todoDate: any;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.el.nativeElement.style.backgroundColor = this.setRowBackgroundColor(
      this.todoDate
    );
  }

  setRowBackgroundColor(date: string): string {
    const target = moment(date).format('YYYY-MM-DD');

    const targetDate = moment(target, 'YYYY-MM-DD');
    const nowDate = moment(new Date(), 'YYYY-MM-DD');

    const differenceInDays = moment.duration(targetDate.diff(nowDate)).asDays();

    if (differenceInDays < 1) {
      return 'darksalmon';
    }
    if (differenceInDays < 3) {
      return 'khaki';
    }
    if (differenceInDays >= 3) {
      return '';
    }
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.el.nativeElement.style.fontWeight = 'bold';
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.el.nativeElement.style.fontWeight = 'normal';
  }
}

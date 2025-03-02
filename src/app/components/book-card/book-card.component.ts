import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { Book } from '../../services/book.service';
import { StatusBadgePipe } from '../../pipes/status-badge.pipe';
import { TimeAgoPipe } from '../../pipes/time-ago.pipe';
import { HighlightDirective } from '../../directives/highlight.directive';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    StatusBadgePipe,
    TimeAgoPipe,
    HighlightDirective
  ],
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css']
})
export class BookCardComponent {
  @Input() book!: Book;
  @Output() bookAction = new EventEmitter<{action: string, bookId: number}>();

  onActionClick(action: string) {
    this.bookAction.emit({action, bookId: this.book.id});
  }

  getActions(): {label: string, icon: string, action: string}[] {
    const actions = [];
    
    switch(this.book.status) {
      case 'Available':
        actions.push({label: 'Reserve', icon: 'bookmark', action: 'reserve'});
        break;
      case 'Issued':
        actions.push({label: 'Return', icon: 'assignment_return', action: 'return'});
        break;
      case 'Reserved':
        actions.push({label: 'Cancel', icon: 'cancel', action: 'cancel'});
        break;
      case 'Overdue':
        actions.push({label: 'Return', icon: 'assignment_return', action: 'return'});
        actions.push({label: 'Pay Fine', icon: 'payment', action: 'pay'});
        break;
    }
    
    // Always include view details
    actions.push({label: 'Details', icon: 'info', action: 'details'});
    
    return actions;
  }
}
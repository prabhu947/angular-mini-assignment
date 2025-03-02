import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';

interface CalendarDay {
  date: Date;
  dayNumber: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  hasEvent: boolean;
}

interface CalendarEvent {
  id: number;
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  location?: string;
  color?: string;
  createdBy?: string;
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatDialogModule
  ],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
  weekdays: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  calendarDays: CalendarDay[] = [];
  
  currentDate = new Date();
  currentMonth = '';
  currentYear = 0;
  
  selectedDay: Date | null = null;
  selectedEvents: CalendarEvent[] = [];
  
  events: CalendarEvent[] = [
    {
      id: 1,
      title: 'Project Review',
      description: 'Review Angular mini-assignment progress',
      startTime: new Date(2025, 3, 15, 10, 0),
      endTime: new Date(2025, 3, 15, 11, 30),
      location: 'Room 204'
    },
    {
      id: 2,
      title: 'Team Meeting',
      description: 'Weekly sync-up',
      startTime: new Date(2025, 3, 10, 14, 0),
      endTime: new Date(2025, 3, 10, 15, 0),
      location: 'Conference Room A'
    }
  ];
  
  constructor(private dialog: MatDialog) {}
  
  ngOnInit(): void {
    this.initCalendar();
  }
  
  initCalendar(): void {

    this.currentMonth = this.currentDate.toLocaleString('default', { month: 'long' });
    this.currentYear = this.currentDate.getFullYear();
    
    this.generateCalendarDays();
  }
  
  generateCalendarDays(): void {
    this.calendarDays = [];
    

    const firstDayOfMonth = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth(),
      1
    );

    const lastDayOfMonth = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() + 1,
      0
    );
    

    const firstDayWeekday = firstDayOfMonth.getDay();
    

    const daysFromPreviousMonth = firstDayWeekday;
    const previousMonth = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth(),
      0
    );
    
    for (let i = daysFromPreviousMonth - 1; i >= 0; i--) {
      const date = new Date(
        previousMonth.getFullYear(),
        previousMonth.getMonth(),
        previousMonth.getDate() - i
      );
      
      this.calendarDays.push({
        date,
        dayNumber: date.getDate(),
        isCurrentMonth: false,
        isToday: this.isToday(date),
        hasEvent: this.hasEvent(date)
      });
    }
    

    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
      const date = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth(),
        i
      );
      
      this.calendarDays.push({
        date,
        dayNumber: i,
        isCurrentMonth: true,
        isToday: this.isToday(date),
        hasEvent: this.hasEvent(date)
      });
    }
    
    const totalCells = 42; 
    const daysFromNextMonth = totalCells - this.calendarDays.length;
    

    for (let i = 1; i <= daysFromNextMonth; i++) {
      const date = new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth() + 1,
        i
      );
      
      this.calendarDays.push({
        date,
        dayNumber: i,
        isCurrentMonth: false,
        isToday: this.isToday(date),
        hasEvent: this.hasEvent(date)
      });
    }
  }
  
  isToday(date: Date): boolean {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  }
  
  hasEvent(date: Date): boolean {
    return this.events.some(event => 
      event.startTime.getDate() === date.getDate() &&
      event.startTime.getMonth() === date.getMonth() &&
      event.startTime.getFullYear() === date.getFullYear()
    );
  }
  
  previousMonth(): void {
    this.currentDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() - 1,
      1
    );
    this.initCalendar();
  }
  
  nextMonth(): void {
    this.currentDate = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() + 1,
      1
    );
    this.initCalendar();
  }
  
  goToToday(): void {
    this.currentDate = new Date();
    this.initCalendar();
  }
  
  selectDay(day: CalendarDay): void {
    this.selectedDay = day.date;
    this.selectedEvents = this.getEventsForDay(day.date);
  }
  
  getEventsForDay(date: Date): CalendarEvent[] {
    return this.events.filter(event => 
      event.startTime.getDate() === date.getDate() &&
      event.startTime.getMonth() === date.getMonth() &&
      event.startTime.getFullYear() === date.getFullYear()
    );
  }
  
  openEventDialog(): void {
    console.log('Opening event dialog');
  }
  
  editEvent(event: CalendarEvent): void {
    console.log('Edit event:', event);
  }
  
  deleteEvent(event: CalendarEvent): void {
    console.log('Delete event:', event);

    this.events = this.events.filter(e => e.id !== event.id);
    
    if (this.selectedDay) {
      this.selectedEvents = this.getEventsForDay(this.selectedDay);
    }
    

    this.generateCalendarDays();
  }
}
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAgo',
  standalone: true
})
export class TimeAgoPipe implements PipeTransform {
  transform(value: Date | string): string {
    if (!value) return '';
    
    const date = value instanceof Date ? value : new Date(value);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    

    if (seconds < 0) {
      return this.formatFutureDate(date);
    }
    

    if (seconds < 60) return `${seconds} seconds ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
    if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;
    if (seconds < 2592000) return `${Math.floor(seconds / 604800)} weeks ago`;
    if (seconds < 31536000) return `${Math.floor(seconds / 2592000)} months ago`;
    
    return `${Math.floor(seconds / 31536000)} years ago`;
  }
  
  private formatFutureDate(date: Date): string {
    const seconds = Math.floor((date.getTime() - new Date().getTime()) / 1000);
    
    if (seconds < 60) return `in ${seconds} seconds`;
    if (seconds < 3600) return `in ${Math.floor(seconds / 60)} minutes`;
    if (seconds < 86400) return `in ${Math.floor(seconds / 3600)} hours`;
    if (seconds < 604800) return `in ${Math.floor(seconds / 86400)} days`;
    if (seconds < 2592000) return `in ${Math.floor(seconds / 604800)} weeks`;
    if (seconds < 31536000) return `in ${Math.floor(seconds / 2592000)} months`;
    
    return `in ${Math.floor(seconds / 31536000)} years`;
  }
}
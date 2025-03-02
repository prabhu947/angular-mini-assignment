import { Pipe, PipeTransform } from '@angular/core';

export interface BadgeInfo {
  color: string;
  icon?: string;
  text: string;
}

@Pipe({
  name: 'statusBadge',
  standalone: true
})
export class StatusBadgePipe implements PipeTransform {
  transform(status: string): BadgeInfo {
    status = status?.toLowerCase() || '';
    
    switch (status) {
      case 'active':
        return { color: 'primary', text: 'Active', icon: 'check_circle' };
      case 'overdue':
        return { color: 'warn', text: 'Overdue', icon: 'error' };
      case 'reserved':
        return { color: 'accent', text: 'Reserved', icon: 'bookmark' };
      case 'returned':
        return { color: 'success', text: 'Returned', icon: 'assignment_turned_in' };
      case 'pending':
        return { color: 'info', text: 'Pending', icon: 'hourglass_empty' };
      case 'cancelled':
        return { color: 'default', text: 'Cancelled', icon: 'cancel' };
      case 'issued':
        return { color: 'primary', text: 'Issued', icon: 'assignment_turned_in' };
      case 'available':
        return { color: 'success', text: 'Available', icon: 'check_circle' };
      default:
        return { color: 'default', text: status || 'Unknown', icon: 'help' };
    }
  }
}
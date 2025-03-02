import { Pipe, PipeTransform } from '@angular/core';

export interface Task {
  id: number;
  title: string;
  description?: string;
  dueDate: Date;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  category?: string;
}

@Pipe({
  name: 'sortTasks',
  standalone: true,
})
export class SortTasksPipe implements PipeTransform {
  transform(tasks: Task[], sortBy: 'priority' | 'dueDate' | 'title' = 'dueDate', ascending = true): Task[] {
    if (!tasks || tasks.length === 0) {
      return tasks;
    }

    const sortedTasks = [...tasks];

    sortedTasks.sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'priority':
          comparison = this.comparePriorities(a.priority, b.priority);
          break;
        case 'dueDate':
          comparison = this.compareDates(a.dueDate, b.dueDate);
          break;
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        default:
          comparison = this.compareDates(a.dueDate, b.dueDate);
      }

      return ascending ? comparison : -comparison;
    });

    return sortedTasks;
  }

  private comparePriorities(a: string, b: string): number {
    const priorityOrder: { [key: string]: number } = {
      'high': 0,
      'medium': 1,
      'low': 2
    };

    return priorityOrder[a] - priorityOrder[b];
  }

  private compareDates(a: Date, b: Date): number {
    return new Date(a).getTime() - new Date(b).getTime();
  }
}
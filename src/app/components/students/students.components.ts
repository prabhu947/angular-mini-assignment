import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatMenuModule } from '@angular/material/menu';

interface Student {
  id: number;
  name: string;
  email: string;
  rollNumber: string;
  department: string;
  joinDate: Date;
  status: 'Active' | 'Inactive' | 'Alumni';
}

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatMenuModule
  ],
  templateUrl: './students.components.html',
  styleUrls: ['./students.components.css']
})
export class StudentsComponent implements OnInit {
  students: Student[] = [];
  filteredStudents: Student[] = [];
  displayedColumns: string[] = ['name', 'email', 'rollNumber', 'department', 'joinDate', 'status', 'actions'];
  

  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 50];
  pageIndex = 0;
  totalStudents = 0;
  
  searchText = '';
  
  constructor() {
    this.generateMockStudents();
    this.totalStudents = this.students.length;
    this.applyFilters();
  }
  
  ngOnInit(): void {
  }
  
  generateMockStudents(): void {
    const departments = ['Computer Science', 'Electrical Engineering', 'Mechanical Engineering', 'Civil Engineering', 'Chemical Engineering'];
    const statuses: ('Active' | 'Inactive' | 'Alumni')[] = ['Active', 'Inactive', 'Alumni'];
    
    for (let i = 1; i <= 100; i++) {
      const firstName = `FirstName${i}`;
      const lastName = `LastName${i}`;
      const department = departments[Math.floor(Math.random() * departments.length)];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const joinYear = 2018 + Math.floor(Math.random() * 5); 
      
      this.students.push({
        id: i,
        name: `${firstName} ${lastName}`,
        email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@university.edu`,
        rollNumber: `R${joinYear}${10000 + i}`,
        department,
        joinDate: new Date(joinYear, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
        status
      });
    }
  }
  
  applyFilters(): void {
    if (!this.searchText.trim()) {
      this.filteredStudents = [...this.students];
    } else {
      const searchTerms = this.searchText.toLowerCase().trim().split(' ');
      
      this.filteredStudents = this.students.filter(student => {
        const studentText = `${student.name.toLowerCase()} ${student.email.toLowerCase()} ${student.rollNumber.toLowerCase()} ${student.department.toLowerCase()}`;
        return searchTerms.every(term => studentText.includes(term));
      });
    }
    
    this.totalStudents = this.filteredStudents.length;
    this.pageIndex = 0;
  }
  
  handlePageEvent(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }
  
  getCurrentPageData(): Student[] {
    const startIndex = this.pageIndex * this.pageSize;
    return this.filteredStudents.slice(startIndex, startIndex + this.pageSize);
  }
  
  sortData(sort: Sort): void {
    if (!sort.active || sort.direction === '') {
      return;
    }
    
    this.filteredStudents = [...this.filteredStudents].sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name': return this.compare(a.name, b.name, isAsc);
        case 'email': return this.compare(a.email, b.email, isAsc);
        case 'rollNumber': return this.compare(a.rollNumber, b.rollNumber, isAsc);
        case 'department': return this.compare(a.department, b.department, isAsc);
        case 'joinDate': return this.compare(a.joinDate.getTime(), b.joinDate.getTime(), isAsc);
        case 'status': return this.compare(a.status, b.status, isAsc);
        default: return 0;
      }
    });
  }
  
  compare(a: string | number, b: string | number, isAsc: boolean): number {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
  
  getStatusColor(status: string): string {
    switch (status) {
      case 'Active': return 'primary';
      case 'Inactive': return 'warn';
      case 'Alumni': return 'accent';
      default: return '';
    }
  }
}
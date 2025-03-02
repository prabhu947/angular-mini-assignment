import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { Task } from '../../pipes/sort-tasks.pipe';

@Component({
  selector: 'app-task-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css']
})
export class TaskDialogComponent {
  taskForm: FormGroup;
  dialogTitle: string;
  priorities = [
    { value: 'high', viewValue: 'High' },
    { value: 'medium', viewValue: 'Medium' },
    { value: 'low', viewValue: 'Low' }
  ];

  constructor(
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { task?: Task, date?: Date },
    private fb: FormBuilder
  ) {
    this.dialogTitle = this.data.task ? 'Edit Task' : 'Add New Task';

    this.taskForm = this.fb.group({
      title: [this.data.task?.title || '', [Validators.required, Validators.minLength(3)]],
      description: [this.data.task?.description || ''],
      dueDate: [this.data.task?.dueDate || this.data.date || new Date(), Validators.required],
      priority: [this.data.task?.priority || 'medium', Validators.required],
      completed: [this.data.task?.completed || false]
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const task: Task = {
        ...(this.data.task || { id: Date.now() }),
        ...this.taskForm.value
      };
      this.dialogRef.close(task);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
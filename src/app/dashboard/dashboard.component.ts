import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatSelectModule,
    MatFormFieldModule,
    ReactiveFormsModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  filterControl = new FormControl<string>('all');
  orderChart: Chart | undefined;
  taskChart: Chart | undefined;
  shipmentChart: Chart | undefined;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.filterControl.valueChanges.subscribe(value => {
      if (value) {
        this.updateChartData(value);
      }
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.initOrderChart();
      this.initTaskChart();
      this.initShipmentChart();
    }, 0);
  }

  private initOrderChart(): void {
    const canvas = document.getElementById('orderChart') as HTMLCanvasElement;
    if (!canvas || !canvas.getContext) return;

    this.orderChart = new Chart(canvas, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
          {
            label: 'Active Orders',
            data: [65, 59, 80, 81, 56, 55],
            borderColor: '#4CAF50',
            backgroundColor: 'rgba(76, 175, 80, 0.1)',
            tension: 0.4,
            fill: true
          },
          {
            label: 'Inactive Orders',
            data: [28, 48, 40, 19, 86, 27],
            borderColor: '#F44336',
            backgroundColor: 'rgba(244, 67, 54, 0.1)',
            tension: 0.4,
            fill: true
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'top' } }
      }
    });
  }

  private initTaskChart(): void {
    const canvas = document.getElementById('taskChart') as HTMLCanvasElement;
    if (!canvas || !canvas.getContext) return;

    this.taskChart = new Chart(canvas, {
      type: 'pie',
      data: {
        labels: ['Cash Management', 'Financial', 'Vendor Contracts', 'Advertising'],
        datasets: [{
          data: [30, 25, 25, 20],
          backgroundColor: [
            '#4CAF50',
            '#2196F3',
            '#FFC107',
            '#9C27B0'
          ]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'right' } }
      }
    });
  }

  private initShipmentChart(): void {
    const canvas = document.getElementById('shipmentChart') as HTMLCanvasElement;
    if (!canvas || !canvas.getContext) return;

    this.shipmentChart = new Chart(canvas, {
      type: 'pie',
      data: {
        labels: ['In Transit', 'Delivered', 'Pending', 'Delayed'],
        datasets: [{
          data: [40, 30, 20, 10],
          backgroundColor: [
            '#2196F3',
            '#4CAF50',
            '#FFC107',
            '#F44336'
          ]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'right' } }
      }
    });
  }

  private updateChartData(filter: string): void {
    if (!this.orderChart) return;
    
    const allDatasets = [
      {
        label: 'Active Orders',
        data: [65, 59, 80, 81, 56, 55],
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        tension: 0.4,
        fill: true
      },
      {
        label: 'Inactive Orders',
        data: [28, 48, 40, 19, 86, 27],
        borderColor: '#F44336',
        backgroundColor: 'rgba(244, 67, 54, 0.1)',
        tension: 0.4,
        fill: true
      }
    ];
    
    switch(filter) {
      case 'active':
        this.orderChart.data.datasets = [allDatasets[0]];
        break;
      case 'inactive':
        this.orderChart.data.datasets = [allDatasets[1]];
        break;
      default:
        this.orderChart.data.datasets = allDatasets;
    }
    
    this.orderChart.update();
  }
}
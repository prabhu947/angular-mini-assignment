import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule, Sort } from '@angular/material/sort';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';

interface StockItem {
  consumerName: string;
  product: string;
  supplier: string;
  entryDate: Date;
  quantity: number;
  price: number;
  sellingPrice: number;
}

@Component({
  selector: 'app-stock-management',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule
  ],
  templateUrl: './stock-management.component.html',
  styleUrls: ['./stock-management.component.scss']
})
export class StockManagementComponent implements OnInit {
  displayedColumns: string[] = [
    'consumerName',
    'product',
    'supplier',
    'entryDate',
    'quantity',
    'price',
    'sellingPrice'
  ];
  
  stockData: StockItem[] = [];
  totalProducts = 0;
  totalValue = 0;
  lowStockCount = 0;

  ngOnInit() {
    this.generateMockData();
    this.calculateMetrics();
  }

  private generateMockData() {
    const products = ['Rice', 'Wheat', 'Sugar', 'Oil', 'Milk'];
    const suppliers = ['SupplierA', 'SupplierB', 'SupplierC'];
    const consumers = ['Store1', 'Store2', 'Store3', 'Store4'];

    for (let i = 0; i < 50; i++) {
      const quantity = Math.floor(Math.random() * 1000);
      const price = Math.floor(Math.random() * 100) + 10;
      
      this.stockData.push({
        consumerName: consumers[Math.floor(Math.random() * consumers.length)],
        product: products[Math.floor(Math.random() * products.length)],
        supplier: suppliers[Math.floor(Math.random() * suppliers.length)],
        entryDate: new Date(2024, Math.floor(Math.random() * 3), Math.floor(Math.random() * 28) + 1),
        quantity,
        price,
        sellingPrice: price * 1.2
      });
    }
  }

  private calculateMetrics() {
    this.totalProducts = this.stockData.reduce((sum, item) => sum + item.quantity, 0);
    this.totalValue = this.stockData.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    this.lowStockCount = this.stockData.filter(item => item.quantity < 100).length;
  }
}
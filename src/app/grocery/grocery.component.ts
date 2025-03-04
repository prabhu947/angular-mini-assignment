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

interface GroceryTransaction {
  id: number;
  consumer: string;
  product: string;
  supplier: string;
  entryDate: Date;
  quantity: number;
  purchasePrice: number;
  sellingPrice: number;
  cashier: string;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

@Component({
  selector: 'app-grocery',
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
  templateUrl: './grocery.component.html',
  styleUrls: ['./grocery.component.css']
})
export class GroceryComponent implements OnInit {
  transactions: GroceryTransaction[] = [];
  filteredTransactions: GroceryTransaction[] = [];
  displayedColumns: string[] = [
    'consumer', 'product', 'supplier', 'entryDate', 
    'quantity', 'purchasePrice', 'sellingPrice', 
    'cashier', 'status', 'actions'
  ];

  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 50];
  pageIndex = 0;
  totalTransactions = 0;
  
  searchText = '';
  
  constructor() {
    this.generateMockData();
    this.totalTransactions = this.transactions.length;
    this.applyFilters();
  }
  
  ngOnInit(): void {}
  
  generateMockData(): void {
    const products = ['Rice', 'Wheat', 'Sugar', 'Oil', 'Milk', 'Bread'];
    const suppliers = ['SupplierA', 'SupplierB', 'SupplierC'];
    const cashiers = ['John', 'Jane', 'Mike', 'Sarah'];
    const statuses: ('In Stock' | 'Low Stock' | 'Out of Stock')[] = ['In Stock', 'Low Stock', 'Out of Stock'];
    
    for (let i = 1; i <= 100; i++) {
      const product = products[Math.floor(Math.random() * products.length)];
      const supplier = suppliers[Math.floor(Math.random() * suppliers.length)];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const quantity = Math.floor(Math.random() * 1000);
      const purchasePrice = Math.floor(Math.random() * 100) + 10;
      
      this.transactions.push({
        id: i,
        consumer: `Customer${i}`,
        product,
        supplier,
        entryDate: new Date(2024, Math.floor(Math.random() * 3), Math.floor(Math.random() * 28) + 1),
        quantity,
        purchasePrice,
        sellingPrice: purchasePrice * 1.2, // 20% markup
        cashier: cashiers[Math.floor(Math.random() * cashiers.length)],
        status
      });
    }
  }
  
  applyFilters(): void {
    if (!this.searchText.trim()) {
      this.filteredTransactions = [...this.transactions];
    } else {
      const searchTerms = this.searchText.toLowerCase().trim().split(' ');
      
      this.filteredTransactions = this.transactions.filter(transaction => {
        const searchableText = `
          ${transaction.consumer.toLowerCase()} 
          ${transaction.product.toLowerCase()} 
          ${transaction.supplier.toLowerCase()} 
          ${transaction.cashier.toLowerCase()}
        `;
        return searchTerms.every(term => searchableText.includes(term));
      });
    }
    
    this.totalTransactions = this.filteredTransactions.length;
    this.pageIndex = 0;
  }
  
  handlePageEvent(event: PageEvent): void {
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
  }
  
  getCurrentPageData(): GroceryTransaction[] {
    const startIndex = this.pageIndex * this.pageSize;
    return this.filteredTransactions.slice(startIndex, startIndex + this.pageSize);
  }
  
  sortData(sort: Sort): void {
    if (!sort.active || sort.direction === '') {
      return;
    }
    
    this.filteredTransactions = [...this.filteredTransactions].sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'consumer': return this.compare(a.consumer, b.consumer, isAsc);
        case 'product': return this.compare(a.product, b.product, isAsc);
        case 'supplier': return this.compare(a.supplier, b.supplier, isAsc);
        case 'entryDate': return this.compare(a.entryDate.getTime(), b.entryDate.getTime(), isAsc);
        case 'quantity': return this.compare(a.quantity, b.quantity, isAsc);
        case 'purchasePrice': return this.compare(a.purchasePrice, b.purchasePrice, isAsc);
        case 'sellingPrice': return this.compare(a.sellingPrice, b.sellingPrice, isAsc);
        case 'cashier': return this.compare(a.cashier, b.cashier, isAsc);
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
      case 'In Stock': return 'primary';
      case 'Low Stock': return 'warn';
      case 'Out of Stock': return 'accent';
      default: return '';
    }
  }
}
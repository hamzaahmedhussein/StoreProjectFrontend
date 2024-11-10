import { Component, inject } from '@angular/core';
import { HomeService } from '../../../services/home/home.service';
import { ProductResult } from '../../../models/product-result';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  products: ProductResult[] = [];
  search: string = '';
  pageIndex: number = 1;
  pageSize: number = 1;
  totalPages: number = 0;
  maxPrice: number = 0;
  minPrice: number = 0;
  category: string = '';

  private homeService = inject(HomeService);

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.homeService.paginatedFilteredProucts(this.pageIndex, this.pageSize, this.search,this.category,this.minPrice,this.maxPrice).subscribe(
      response => {
        this.products = response.data.data;
        this.totalPages = Math.ceil(response.data.totalPages / this.pageSize);
        console.log('Products:', this.products);
      },
      error => {
        console.error('Error fetching Products:', error.message);
      }
    );
  }
  
  onSearchChange(event: any, inputType: string): void {
    const searchValue = event.target.value;
    switch (inputType) {
      case 'search': 
        this.search = searchValue;
        break;
      case 'category': 
        this.category = searchValue;
        break;
      case 'minPrice': 
        this.minPrice = +searchValue;
        break;
      case 'maxPrice':
        this.maxPrice = +searchValue;
        break;
    }
    this.pageIndex = 1; 
    this.loadProducts(); 
  }

  onPageChange(newPageIndex: number): void {
    if (newPageIndex > 0 && newPageIndex <= this.totalPages) {
      this.pageIndex = newPageIndex;
      this.loadProducts();
    }
  }
  

}

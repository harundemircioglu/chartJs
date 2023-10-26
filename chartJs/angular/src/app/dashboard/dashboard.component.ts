import { Component, OnInit } from '@angular/core';
import { CategoryRequest } from 'core/models/request/category-request.model';
import { Category } from 'core/models/category.model';
import { ProductRequest } from 'core/models/request/product-request.model';
import { Product } from 'core/models/product.model';
import { ApiService } from 'core/services/api/api.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { ChartType } from 'chart.js';

interface Charts {
  name: string;
  placeholder: string;
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [MessageService]
})

export class DashboardComponent implements OnInit {

  constructor(
    private apiService: ApiService,
    private messageService: MessageService,
    private router: Router
  ) { }

  charts: Charts[] | undefined;

  selectedCharts: Charts | undefined;

  goHome() {
    this.router.navigate(['/']);
  }

  //PRODUCT SECTION

  productRequest: ProductRequest = <ProductRequest>{};

  selectedProduct: number = 0;

  product: Product | null = null;

  //CHART SECTION

  public barChartLabels: string[] = []; // Grafik etiketleri

  public barChartData: any[] = []; // Grafik veri seti

  public barChartOptions: any = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };

  public barChartLegend = true;

  chartType: ChartType = 'bar';

  changeChartType() {
    this.chartType = this.selectedCharts?.name as ChartType || 'bar';
  }

  refreshChartData() {
    this.apiService.getEntity<Product[]>('getProducts').subscribe(response => {
      const products: Product[] = response;
      // Ürün verilerini kullanarak grafik için gerekli formatı oluştur
      const productNames: string[] = products.map(product => product.product_name);
      const productPrices: number[] = products.map(product => product.product_price);

      // Grafik verilerini güncelle
      this.barChartLabels = productNames;
      this.barChartData = [{ data: productPrices, label: 'Fiyatlar' }];
      this.chartType;
    })
  }


  //PRODUCT SECTION

  onCreateProduct() {
    this.apiService.createEntity<Product>('createProduct', this.productRequest).subscribe(response => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Created successful' });
      this.refreshChartData();
    })
  }

  getProductById() {
    this.apiService.getEntityById<Product>('getProductById', this.selectedProduct).subscribe(response => {
      this.product = response;
      console.log(this.product);
    })
  }

  updateProduct() {
    this.apiService.updateEntity<Product>('updateProduct', this.product?.id || 0, this.product).subscribe(response => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Updated successful' });
    })
  }

  deleteProduct() {
    this.apiService.deleteEntity<Product>('deleteProduct', this.product?.id || 0).subscribe(response => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Deleted successful' });
    })
  }

  //CATEGORY SECTION

  categoryRequest: CategoryRequest = <CategoryRequest>{};

  categories: Category[] = [];

  category: Category | null = null;

  selectedCategory: number = 0;

  onCreateCategory() {
    this.apiService.createEntity<Category>('createCategory', this.categoryRequest).subscribe(response => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Created successful' });
    })
  }


  refresh() {
    this.apiService.getEntity<Category[]>('getCategories').subscribe(response => {
      this.categories = response;
    })
  }

  getCategoryById() {
    this.apiService.getEntityById<Category>('getCategoryById', this.selectedCategory).subscribe(response => {
      this.category = response;
      console.log(this.category);
    })
  }

  updateCategory() {
    this.apiService.updateEntity<Category>('updateCategory', this.category?.id || 0, this.category).subscribe(response => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Updated successful' });
    })
  }

  deleteCategory() {
    this.apiService.deleteEntity<Category>('deleteCategory', this.category?.id || 0).subscribe(response => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Deleted successful' });
    })
  }

  ngOnInit() {
    this.refresh();
    this.refreshChartData();

    this.charts = [
      { name: 'bar', placeholder: 'Bar' },
      { name: 'doughnut', placeholder: 'Doughnut' },
      { name: 'pie', placeholder: 'Pie' },
      { name: 'line', placeholder: 'Line' },
      { name: 'polarArea', placeholder: 'Polar Area' },
      { name: 'radar', placeholder: 'Radar' }
    ];
  }
}

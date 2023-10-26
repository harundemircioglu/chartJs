import { Component, OnInit } from '@angular/core';
import { Product } from 'core/models/product.model';
import { ApiService } from 'core/services/api/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }

  products: Product[] = [];

  refresh() {
    this.apiService.getEntity<Product[]>('getProducts').subscribe(response => {
      this.products = response;
    })
  }

  goDashboard() {
    this.router.navigate(['/dashboard']);
  }

  ngOnInit() {
    this.refresh();
  }
}

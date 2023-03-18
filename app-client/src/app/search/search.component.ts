import { Component, OnInit } from '@angular/core';
import { product } from './product.model';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  searchQuery: string = '';
  searchUrl: string = "http://localhost:8080/search"

  sellingItems: product[] = [{
    name: 'awesome t-shirt',
    colors: ['red'],
    description: 'very very awesome t-shirt',
    image:'src',
    quantity: 10,
    sellersShop: {},
    creationDate: new Date(),
},
{
    name: 'not awesome jeans',
    colors: ['red'],
    description: 'very very not awesome jeans',
    image:'src',
    quantity: 5,
    sellersShop: {},
    creationDate: new Date(),
}];

products: product[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  search(){
    this.http.post<product[]>(this.searchUrl, this.searchQuery).subscribe(
      data => {
        console.log(data);
        this.products = data;
      },
      error => {
        console.error('Error searching products:', error);
      }
    );
  }

}

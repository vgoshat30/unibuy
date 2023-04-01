import { Component, OnInit, Pipe, PipeTransform, ViewEncapsulation } from '@angular/core';
import { product } from './product.model';
import { HttpClient } from '@angular/common/http';
import {Tags} from "../models/tags.model";
import { Filter } from '../models/filter';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SearchComponent implements OnInit {

  searchQuery: string = '';
  searchUrl: string = "http://localhost:8080/search"

colors: string[] = ["red","white", "blue", "green", "black", "yellow"];

Tags = Tags;
values = Object.values;
selectedOptionsTags:Tags[] = [];
selectedColors:string[] = [];
products: product[] = [];

constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  search(){
    const searchFilter:Filter = {
       tags:this.selectedOptionsTags,
       wordSearch:this.searchQuery,
       colors:this.selectedColors,
       limit:10
    };
    console.log(searchFilter);
    this.http.post<product[]>(this.searchUrl, searchFilter).subscribe(
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

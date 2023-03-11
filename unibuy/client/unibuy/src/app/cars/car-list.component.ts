import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core'
import { RouterExtensions } from '@nativescript/angular'
import { ListViewEventData } from 'nativescript-ui-listview'
import { Subscription } from 'rxjs'
import { finalize } from 'rxjs/operators'
import { ObservableArray } from '@nativescript/core'
import { SearchBar } from '@nativescript/core'
import { RadListViewComponent } from "nativescript-ui-listview/angular";

import { Car } from './shared/car.model'
import { CarService } from './shared/car.service'

@Component({
  selector: 'CarsList',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss'],
})
export class CarListComponent implements OnInit, OnDestroy {
  private _isLoading: boolean = false
  private _cars: ObservableArray<Car> = new ObservableArray<Car>([])
  private _dataSubscription: Subscription;
  private _isFilteringEnabled: boolean;
  private _myFilteringFunc: (item: any) => any;
  searchPhrase: string;

  @ViewChild("myListView", { read: RadListViewComponent, static: false }) myListViewComponent: RadListViewComponent;

  constructor(private _carService: CarService, private _routerExtensions: RouterExtensions) {
    this.myFilteringFunc = (item: Car) => {
      return item && item.name.includes("");
    };
    this._isFilteringEnabled = true;
  }

  ngOnInit(): void {
    if (!this._dataSubscription) {
      this._isLoading = true

      this._dataSubscription = this._carService
        .load()
        .pipe(finalize(() => (this._isLoading = false)))
        .subscribe((cars: Array<Car>) => {
          this._cars = new ObservableArray(cars)
          this._isLoading = false
        })
    }
  }

  onSubmit(args) {
    const searchBar = args.object as SearchBar
    console.log(`Searching for ${searchBar.text}`)
    const listView = this.myListViewComponent.listView;
    // this._isFilteringEnabled = true;
    this.myFilteringFunc = (item: Car) => {
      return item && item.name.includes(searchBar.text);
    };
    listView.filteringFunction = this.myFilteringFunc;
  }

  onTextChanged(args) {
    const searchBar = args.object as SearchBar
    console.log(`Input changed! New value: ${searchBar.text}`)
  }

  onClear(args) {
    const searchBar = args.object as SearchBar
    console.log(`Clear event raised`)
  }

  ngOnDestroy(): void {
    if (this._dataSubscription) {
      this._dataSubscription.unsubscribe()
      this._dataSubscription = null
    }
  }

  get cars(): ObservableArray<Car> {
    return this._cars
  }

  get isLoading(): boolean {
    return this._isLoading
  }

  set myFilteringFunc(value: (item: any) => any) {
    this._myFilteringFunc = value;
  }

  get myFilteringFunc(): (item: any) => any {
    return this._myFilteringFunc;
  }

  public toggleFilter() {
    const listView = this.myListViewComponent.listView;
    if (!listView.filteringFunction) {
        listView.filteringFunction = this.myFilteringFunc;
        this._isFilteringEnabled = true;
    } else {
        listView.filteringFunction = undefined;
        this._isFilteringEnabled = false;
    }
  }
  get isFilteringEnabled() {
    return this._isFilteringEnabled;
  }

  set isFilteringEnabled(value: boolean) {
    this._isFilteringEnabled = value;
  }


  onCarItemTap(args: ListViewEventData): void {
    const tappedCarItem = args.view.bindingContext

    this._routerExtensions.navigate(['/cars/car-detail', tappedCarItem.id], {
      animated: true,
      transition: {
        name: 'slide',
        duration: 200,
        curve: 'ease',
      },
    })
  }
}

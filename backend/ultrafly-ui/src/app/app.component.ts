import { Component } from '@angular/core';
import { NgSelectConfig } from '@ng-select/ng-select';
import { ApiService } from './api-service.service';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { PopupComponent } from './popup/popup.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {


  selectedCar: number;
  selectedModel: string;
  selectedMake: string;
  selectedYear: string;
  cars: any[];
  displayItems: any[];
  makeOptions: any[];
  modelOptions: any[];
  yearOptions: any[];
  selectedCars: any[] = []; // To store selected cars
  checked: boolean = false;
  isChecked: boolean = false;
  showNextPage: boolean = false
  dialogRef: MatDialogRef<PopupComponent>;
  selectedTrim: any[] = []



  pageSize = 10; // Number of items per page
  currentPage = 1; // Current page number
  totalItems = 0; // Total number of items
  totalPages = 0;
  page = 1;
  limit = 10



  constructor(private config: NgSelectConfig, private apiService: ApiService, public dialog: MatDialog) {
    this.config.notFoundText = 'Custom not found';
    this.config.appendTo = 'body';
    this.config.bindValue = 'value';
    this.assignOptions()
    this.fetchData()
  }




  title = 'ultrafly-ui';

  assignOptions(): void {
    this.apiService.getData({}).subscribe(data => {
      this.makeOptions = data.cars.map((car: any) => { return car.Make })
      this.modelOptions = data.cars.map((car: any) => { return car.Model })
      this.yearOptions = data.cars.map((car: any) => { return car.Year })
      this.makeOptions = [...new Set(this.makeOptions)]
      this.modelOptions = [...new Set(this.modelOptions)]
      this.yearOptions = [...new Set(this.yearOptions)]

      // Handle the API response
      this.cars = data.cars;
    });
  }

  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
    // Fetch data for the selected page or update the existing data
    this.fetchData();
  }

  fetchData(): void {
    let query: any = {}
    if (this.selectedMake) {
      query.make = this.selectedMake
    }
    if (this.selectedModel) {
      query.model = this.selectedModel
    }
    if (this.selectedYear) {
      query.year = this.selectedYear
    }
    if (this.page) {
      query.page = this.page
    }
    if (this.limit) {
      query.limit = this.limit

    }
    this.apiService.getData(query).subscribe(data => {
      this.displayItems = data.cars
      if (data?.results?.next_page?.page) {
        this.showNextPage = true

      } else {
        this.showNextPage = false

      }
    });
  }
  onCarSelect(car: any): void {
    // Check if the car is already selected
    const selectedIndex = this.selectedCars.findIndex((selectedCar) => selectedCar._id === car._id);

    if (selectedIndex === -1) {
      // Car is not selected, add it to the selected cars array
      this.selectedCars.push(car);
    } else {
      // Car is already selected, remove it from the selected cars array
      this.selectedCars.splice(selectedIndex, 1);
    }
  }

  // Function to check if a car is selected
  isCarSelected(car: any): boolean {
    return this.selectedCars.some((selectedCar) => selectedCar._id === car._id);
  }


  getPages(): number[] {
    const pages: number[] = [];
    for (let i = 1; i <= this.totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  selectAllCars(): void {
    this.checked = !this.checked;
    if (this.checked) {
      this.selectedCars = [...this.cars];
    } else {
      this.selectedCars = [];
    }
  }


  selectTrim(event: any, id: any) {
    const value = event.target.checked ? true : false;
    if (value) {
      this.selectedTrim.push(id)
    } else {

      const selectedIndex = this.selectedTrim.findIndex((trim) => trim === id);

      this.selectedTrim.splice(selectedIndex, 1);

    }

  }
  selectAllTrims(event: any) {
    const value = event.target.checked ? true : false;

    if (value) {
      this.selectedTrim = this.displayItems.map((item: any) => {
        return item._id
      })
    } else {
      this.selectedTrim = []
    }



  }

  nextPage() {
    this.page = this.page + 1
    this.fetchData();
  }
  previousPage() {
    if (this.page != 1) {
      this.page = this.page - 1
      this.fetchData();

    }

  }
  updateTrims(note: string) {
    let query: any = { notes: note }
    this.selectedTrim = [...new Set(this.selectedTrim)]
    this.apiService.updateNotes(this.selectedTrim, query).subscribe(data => {
      console.log(data)

    })
  }
  openPopup() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '20vw';
    dialogConfig.height = '30vh';

    this.dialogRef = this.dialog.open(PopupComponent, dialogConfig);
    this.dialogRef.componentInstance.submit.subscribe((note: string) => {
      // Handle the submitted note value in the app component
      console.log('Submitted note:', note);
      this.updateTrims(note)
      // Close the dialog
      this.dialogRef.close();
      this.fetchData()
    });
  }
}


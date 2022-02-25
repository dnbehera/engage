import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';

declare var XLSX;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

 


  constructor() { }

  ngOnInit() {
    
    

  }

  importFile(e: any) {

    let file: File = e.target.files[0];
    if(!file) { return ;}

    let reader = new FileReader();
    reader.onload = (uploadedFile: any) => {

      let data = new Uint8Array(uploadedFile.target.result);
      let arr = [];

      for (let i = 0; i !== data.length; ++i) {
        arr[i] = String.fromCharCode(data[i]);
      }
    
      let bstr = arr.join('');
      console.log(XLSX.read(bstr, { type: 'binary' }));
    };

    reader.readAsArrayBuffer(file);
  }

columnDefs: ColDef[] = [
    { field: 'name' },
    { field: 'email' },
    { field: 'price'}
];


rowData = [
  { name: 'Test1', email: 'email@gmail.com', price: 35000 },
  { name: 'Test2', email: 'email@gmail.com', price: 32000 },
  { name: 'Test3', email: 'email@gmail.com', price: 72000 }
];

}

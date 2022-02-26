import { Component, OnInit } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { Contact, Email } from 'src/app/Shared/common.types';
import { AppStateServiceService } from 'src/app/Shared/services/app-state-service.service';
import { CommonService } from '../../Shared/services/common.service';

declare var XLSX;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {

  gridApi: GridApi;
  selectedContacts: Array<Contact>;
  rowSelection: string = 'multiple';
  public defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100
  };

  constructor(private service: CommonService, private stateService: AppStateServiceService) { }

  ngOnInit() {}

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
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
    { field: 'name', 
    checkboxSelection: true },
    { field: 'email' }
];


rowData = [
  { name: 'Test1', email: 'email@gmail.com'},
  { name: 'Test2', email: 'email@gmail.com' },
  { name: 'Test3', email: 'email@gmail.com' }
];


sendEmail() {
  let emailContent: Email = this.stateService.getEmail();
  this.selectedContacts = this.gridApi.getSelectedRows();
  this.service.sendEmail(emailContent, this.selectedContacts).subscribe( (resp) => {
    console.log("Email Sent");
  });
}

}

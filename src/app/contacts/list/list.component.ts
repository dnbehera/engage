import { Component, OnInit } from '@angular/core';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { Contact, Email } from 'src/app/Shared/common.types';
import { AppStateServiceService } from 'src/app/Shared/services/app-state-service.service';
import { CommonService } from '../../Shared/services/common.service';
import { contactGridColDef, ExcelCols } from './contacts-grid-types';

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

  importedColumns: any = ExcelCols;



  columnDefs: ColDef[] = contactGridColDef;


  constructor(private service: CommonService, private stateService: AppStateServiceService) { }

  ngOnInit() { }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.gridApi.setRowData(this.stateService.getContacts());
  }
  
  importFromExcel(e: any) {
    this.service.importFile(e, this.importedColumns, (data) => {
      this.gridApi.setRowData(data);
      this.stateService.setContacts(data);
    }
    );
  }

  sendEmail() {
    let emailContent: Email = this.stateService.getEmail();
    this.selectedContacts = this.gridApi.getSelectedRows();
    this.service.sendEmail(emailContent, this.selectedContacts).subscribe((resp) => {
      console.log("Email Sent");
    });
  }

}

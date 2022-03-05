import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact, Email, EmailPayload } from '../common.types';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


declare var XLSX;


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  sendEmail(email: Email, recipients: Array<Contact>): Observable<any> {
    let payload: EmailPayload = {
      emailContent: email,
      recipients
    };
    return this.http.post<Email>('url', payload, this.httpOptions)
    .pipe(
      catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }

  importFile(e: any, columns: any, callBack: any ) {

    let file: File = e.target.files[0];
    if (!file) { return; }

    let reader = new FileReader();
    reader.onload = (uploadedFile: any) => {

      let data = new Uint8Array(uploadedFile.target.result);
      let arr = [];

      for (let i = 0; i !== data.length; ++i) {
        arr[i] = String.fromCharCode(data[i]);
      }

      let bstr = arr.join('');
      let workbook = XLSX.read(bstr, { type: 'binary' });
      let sheetName: string = workbook?.SheetNames[0];
      let worksheet = workbook.Sheets[sheetName];

     

      var rowData = [];

      // start at the 2nd row - the first row are the headers
      var rowIndex = 2;

      // iterate over the worksheet pulling out the columns we're expecting
      while (worksheet['A' + rowIndex]) {
        var row = {};
        Object.keys(columns).forEach(function (column) {
          row[columns[column]] = worksheet[column + rowIndex].w;
        });

        rowData.push(row);

        rowIndex++;
      }

      // finally, set the imported rowData into the grid
      callBack(rowData);
    };

    reader.readAsArrayBuffer(file);
  }
}

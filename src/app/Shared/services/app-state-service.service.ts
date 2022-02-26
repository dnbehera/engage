import { Injectable } from '@angular/core';
import { AppState, Contact, Email } from '../common.types';

@Injectable({
  providedIn: 'root'
})
export class AppStateServiceService {

  state: AppState = new AppState();
  constructor() { }

  getEmail() {
    return  this.state.emailContent;
  }

  setEmail(email: Email) {
    this.state.emailContent = email;
  }

  getSelectedContacts() {
    return this.state.selectedContacts;
  }

  setSelectedContacts(contacts: Array<Contact>) {
    this.state.selectedContacts = contacts;
  }
}

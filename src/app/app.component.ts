import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Compose', url: '/email/Compose', icon: 'mail' },
    { title: 'Contacts', url: 'contacts', icon: 'people' },
    { title: 'History', url: 'history', icon: 'receipt' }
  ];
  constructor() {}
}

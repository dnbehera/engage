import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { testUserAgent } from '@ionic/core/dist/types/utils/platform';
import { Email, Contact } from '../Shared/common.types';
import { AppStateServiceService } from '../Shared/services/app-state-service.service';
import { CommonService } from '../Shared/services/common.service';

@Component({
  selector: 'app-folder',
  templateUrl: './email.page.html',
  styleUrls: ['./email.page.scss'],
})
export class EmailPage implements OnInit {
  public folder: string;
  email: Email = {subject: '', body: ''};

  constructor(private activatedRoute: ActivatedRoute, private service: CommonService, private stateService: AppStateServiceService) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }

  onNext() {
    this.stateService.setEmail(this.email);
  }

}

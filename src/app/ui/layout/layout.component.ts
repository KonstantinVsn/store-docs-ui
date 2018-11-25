import { Component, OnInit } from '@angular/core';
import { UKeyService } from '../services/ukey.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  loading: boolean

  constructor(private UKey: UKeyService) { 
    UKey.loading.subscribe(data => this.loading = data);
  }

  ngOnInit() {
     
  }

}

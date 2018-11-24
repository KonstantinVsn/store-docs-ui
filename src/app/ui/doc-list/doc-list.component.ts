import { Component, OnInit } from '@angular/core';
import { UKeyService } from '../services/ukey.service';

@Component({
  selector: 'app-doc-list',
  templateUrl: './doc-list.component.html',
  styleUrls: ['./doc-list.component.scss']
})
export class DocListComponent implements OnInit {

  constructor(private UKey: UKeyService) { }

  ngOnInit() {
    this.UKey.getFiles().subscribe();
  }

}

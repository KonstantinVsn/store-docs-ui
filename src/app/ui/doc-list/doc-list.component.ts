import { Component, OnInit } from '@angular/core';
import { UKeyService } from '../services/ukey.service';
import { Block } from '../models/block';

@Component({
  selector: 'app-doc-list',
  templateUrl: './doc-list.component.html',
  styleUrls: ['./doc-list.component.scss']
})
export class DocListComponent implements OnInit {

  blocks: Array<Block>;

  constructor(private UKey: UKeyService) { }

  ngOnInit() {
    this.UKey.getFiles().subscribe(data => this.blocks = data);
  }



}

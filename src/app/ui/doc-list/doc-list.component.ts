import { Component, OnInit } from '@angular/core';
import { UKeyService } from '../services/ukey.service';
import { Block } from '../models/block';
import {saveAs as importedSaveAs} from "file-saver";

@Component({
  selector: 'app-doc-list',
  templateUrl: './doc-list.component.html',
  styleUrls: ['./doc-list.component.scss']
})
export class DocListComponent implements OnInit {

  blocks: Array<Block>;

  constructor(private UKey: UKeyService) { }

  ngOnInit() {
    this.reload();
  }


  reload(){
    this.UKey.getFiles().subscribe(data => this.blocks = data);
  }

  loadFile(url: string, fileName: string){
debugger
    this.UKey.loadFile(url).subscribe(
      data =>{
        let blob = new Blob([data], { type: "application/octet-stream"});
        importedSaveAs(blob, fileName);
      }
    )
    
  
  }



}

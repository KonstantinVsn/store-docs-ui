import { Component, OnInit, HostListener } from '@angular/core';
import { UKeyConstants } from '../../../assets/ukey-plugin/js/constants';
import { UploadEvent, UploadFile, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { UKeyService } from '../services/ukey.service';
import { Observable, interval, Subject, timer } from 'rxjs';
import { flatMap, takeWhile, switchMap, map, startWith } from 'rxjs/operators';
import { SuccessResponce } from '../models/succesResonce';
import { AlertService } from '../services/alert.service';

@Component({
  selector: 'app-add-doc',
  templateUrl: './add-doc.component.html',
  styleUrls: ['./add-doc.component.scss']
})
export class AddDocComponent implements OnInit {

  file: File
  token: SuccessResponce
  signatureId: string
  tokenStr: string = localStorage.getItem('UKeytoken');
  flow: any = {
    isFileAdded: false,
    isFileSigned: false,
    isFileSent: false
  }

  constructor(private UKey: UKeyService, private alert: AlertService) { }

  ngOnInit() {
    this.timer$ = this.reset$.pipe(
      startWith(0),
      switchMap(() => timer(0, 1000))
    );
  }
  private reset$ = new Subject();
  timer$: Observable<any>;

  public files: UploadFile[] = [];

  public dropped(event: UploadEvent) {
    this.files = event.files;
    for (const droppedFile of event.files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {

          // Here you can access the real file
          console.log(droppedFile.relativePath, file);
          this.file = file
          this.alert.success(`Файл завантажено`);
          this.flow.isFileAdded = true;
          this.flow.isFileSigned = false
          this.flow.isFileSent = false
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }

  signWithUKey() {
    let id;
    this.UKey.mobileAuth().subscribe(
      data => {

        interval(2000)
          .pipe(
            flatMap(() => this.UKey.checkMobileAuth(data.id)),
            takeWhile(data => {
              debugger
              if (data.token) {
                localStorage.setItem("UKeytoken", JSON.stringify(data))
                this.tokenStr = JSON.stringify(data)
                return false
              }
              else {
                return true
              }
            }))
          .subscribe(result => console.log(result));
      },
      error => { debugger }
    );
  }

  signFileWithUKey() {
    debugger
    let token = JSON.parse(localStorage.getItem("UKeytoken"))
    this.UKey.signFile(token.token.access_token, this.file, this.file.name)
      .subscribe(
        data => {
          debugger
          interval(2000)
            .pipe(
              flatMap(() => this.UKey.checkSignatureId(data.requestId)),
              takeWhile(data => {
                if(data.status == "PENDING"){
                  return true;
                }
                if(data.status == "SIGNED"){
                  this.signatureId = data.resultId;
                  this.flow.isFileSigned = true
                  this.UKey.triggerLoading(false);
                  this.alert.success(`Файл підписано`);
                  return false;
                }
              }))
            .subscribe(result => console.log(result));
        })
    error => { }
  }

  sendFile() {
    this.UKey.sendFile(this.file, this.file.name, this.signatureId).subscribe(
      data => {
        this.flow.isFileSent = true
        this.alert.success(`Файл відправлено`);
        debugger
      },
      error => {
        debugger
      }
    )
  }

}

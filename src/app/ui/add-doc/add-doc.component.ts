import { Component, OnInit, HostListener } from '@angular/core';
import { UKeyConstants } from '../../../assets/ukey-plugin/js/constants';
import { UploadEvent, UploadFile, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { UKeyService } from '../services/ukey.service';
import { Observable, interval, Subject, timer } from 'rxjs';
import { flatMap, takeWhile, switchMap, map, startWith } from 'rxjs/operators';
import { SuccessResponce } from '../models/succesResonce';

@Component({
  selector: 'app-add-doc',
  templateUrl: './add-doc.component.html',
  styleUrls: ['./add-doc.component.scss']
})
export class AddDocComponent implements OnInit {

  file: File
  token: SuccessResponce
  tokenStr: string = localStorage.getItem('UKeytoken');
  constructor(private UKey: UKeyService) { }

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
          /**
          // You could upload it like this:
          const formData = new FormData()
          formData.append('logo', file, relativePath)

          // Headers
          const headers = new HttpHeaders({
            'security-token': 'mytoken'
          })

          this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
          .subscribe(data => {
            // Sanitized logo returned from backend
          })
          **/

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

  signFileWithUKey(){
    debugger
    let token = JSON.parse(localStorage.getItem("UKeytoken"))
    this.UKey.signFile(token.token.access_token, this.file, this.file.name)
    .subscribe(
      data=> {
        debugger
      },)
      error=> {}
  }

  public fileOver(event) {
    console.log(event);
  }

  public fileLeave(event) {
    console.log(event);
  }

}
        // let res = this.timer$
        // .pipe((x) => {
        //   let r = this.UKey.checkMobileAuth(data.id).subscribe();
        //   debugger
        //   return x
        // })
        // .subscribe((data) => {

        // })

        // const result = interval(100).pipe(
        //   switchMap(() => this.UKey.checkMobileAuth(data.id)),    
        //   map(res => console.log(result))
        //   )
        // debugger
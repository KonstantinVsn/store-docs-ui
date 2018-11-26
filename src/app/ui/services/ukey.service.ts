import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { map, finalize, catchError, delay } from 'rxjs/operators';
import { AuthRequest } from '../models/authRequest';
import { AuthResponce } from '../models/authResponce';
import { throwError, Subject } from 'rxjs';
import { SuccessResponce } from '../models/succesResonce';
import { Block } from '../models/block';

@Injectable({
  providedIn: 'root'
})
export class UKeyService {

  UKeyEndpoint: string = "https://test.ukey.net.ua:3020"
  StoreDocEndpoint: string = "http://localhost:65289"
  loading: Subject<boolean>;

  constructor(private http: HttpClient) {
    this.loading = new Subject<boolean>();
  }


  mobileAuth() {
    this.triggerLoading(true);
    let req = new AuthRequest();
    req.username = "test@ukey.com"
    //req.username = "konstantinvasin747@ukey.com"
    req.portal.id = "1851da23-e2a8-4a3e-baa9-7cceed979fat"
    req.portal.key = "548618421630d8204fbb73b9b506d3cb4dc9810a16249d14c83fa5209f47e3ccc00590d7f20cc535ba6490057405ccb4"

    return this.http.post<AuthResponce>(`${this.UKeyEndpoint}/api/auth/request`, req)
      .pipe(
        map(user => {
          debugger
          console.log(`"api/auth/request" - ${user}`);
          return user;
        }),
        finalize(() => { this.triggerLoading(false); }))
  }

  checkMobileAuth(id: string) {
    this.triggerLoading(true);
    return this.http.get<any>(`${this.UKeyEndpoint}/api/auth/request/${id}/check`)
      .pipe(
        map((data) => {
          console.log(`/api/auth/request/${id}/check => ${data}`);
          return data
        }),
        catchError((err) => throwError(err)),
        finalize(() => { this.triggerLoading(false); }));
  }

  checkSignatureId(id: string) {
    this.triggerLoading(true);
    return this.http.get<any>(`${this.UKeyEndpoint}/api/v1/requests/file/${id}?mode=full`)
      .pipe(
        map((data) => {
          return data
        }),
        catchError((err) => throwError(err)),
        finalize(() => { }));
  }



  signFile(token: string, file: any, fileName: string) {
    this.triggerLoading(true);
    let _TOKEN = "w5n77v3GRLGq6RJMybpVeaPv6V7sogG3";
    //let _URL = "http://10.10.10.136:3020/api/v1/requests/file";
    var _URL = "https://test.ukey.net.ua:3020/api/v1/requests/file";
    let payload = [];

    payload.push({
      "name": file.name,
      "size": file.size
    });

    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${_TOKEN}`
      })
    };
    var obj = {
      "filePayload": {
        "payload": payload
      },
      "status": "PENDING",
      "timeoutPeriod": 1000000,
      "requestInitiator": {
        "initType": "WEB",
        "name": "Requests V1 test",
        "description": "Test file request",
        "identifier": "some.test.id.file"
      }
    };

    let input = new FormData();
    input.append(fileName, file);
    input.append('request_model', JSON.stringify(obj));
    debugger
    return this.http.post<any>(_URL, input, httpOptions)
      .pipe(
        map(user => {
          debugger
          console.log(`"api/auth/request" - ${user}`);
          return user;
        }),
        finalize(() => { }))
  }

  sendFile(file: any, fileName: string, signatureId: string) {
    this.triggerLoading(true);
    let input = new FormData();
    input.append(fileName, file);
    input.append('signatureId', signatureId);
    debugger
    return this.http.post<AuthResponce>(`${this.StoreDocEndpoint}/api/files/upload`, input)
      .pipe(
        map(data => {
          debugger
          console.log(`"api/auth/request" - ${data}`);
          return data;
        }),
        finalize(() => { this.triggerLoading(false); }))
  }

  getFiles() {
    this.triggerLoading(true);
    return this.http.get<Array<Block>>(`${this.StoreDocEndpoint}/api/files`)
      .pipe(
        map((data) => {
          return data
        }),
        catchError((err) => throwError(err)),
        finalize(() => { this.triggerLoading(false); }));
  }

  triggerLoading(status: boolean) {
    this.loading.next(status)
  }
}

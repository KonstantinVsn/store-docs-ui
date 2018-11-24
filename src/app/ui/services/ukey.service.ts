import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { map, finalize, catchError, delay } from 'rxjs/operators';
import { AuthRequest } from '../models/authRequest';
import { AuthResponce } from '../models/authResponce';
import { throwError } from 'rxjs';
import { SuccessResponce } from '../models/succesResonce';

@Injectable({
  providedIn: 'root'
})
export class UKeyService {

  constructor(private http: HttpClient) { }
  endpoint: string = "https://test.ukey.net.ua:3020"
  mobileAuth() {
    let req = new AuthRequest();
    req.username = "test@ukey.com"
    req.portal.id = "1851da23-e2a8-4a3e-baa9-7cceed979fat"
    req.portal.key = "548618421630d8204fbb73b9b506d3cb4dc9810a16249d14c83fa5209f47e3ccc00590d7f20cc535ba6490057405ccb4"

    return this.http.post<AuthResponce>(`${this.endpoint}/api/auth/request`, req)
      .pipe(
        map(user => {
          debugger
          console.log(`"api/auth/request" - ${user}`);
          return user;
        }),
        finalize(() => { }))
  }

  checkMobileAuth(id: string) {
    return this.http.get<any>(`${this.endpoint}/api/auth/request/${id}/check`)
      .pipe(
        map((data) => {
          console.log(`/api/auth/request/${id}/check => ${data}`);
          return data
        }),
        catchError((err) => throwError(err)),
        finalize(() => { }));
  }

  signFile(token: string, file: any, fileName:string) {
    let _TOKEN = "w5n77v3GRLGq6RJMybpVeaPv6V7sogG3";
    //let _URL = "http://10.10.10.136:3020/api/v1/requests/file";
    var _URL = "https://test.ukey.net.ua:3020/api/v1/requests/file";
    let payload = [];
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
    return this.http.post<AuthResponce>(_URL, input, httpOptions)
      .pipe(
        map(user => {
          debugger
          console.log(`"api/auth/request" - ${user}`);
          return user;
        }),
        finalize(() => { }))
  }

  checkStatus(data: any) {
    debugger
    if (data.token) {
      return true;
    }
    return false;
  }
}

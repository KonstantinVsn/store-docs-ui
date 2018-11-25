import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AlertService  {

    constructor(private toastr: ToastrService) {
    }

    success(message: string) {
      this.toastr.success(message, "Успішно!")
    }

    warning(message: string) {
      this.toastr.warning(message, "Увага!")
    }


    error(message: string) {
      this.toastr.error(message, "Помилка!")
    }

}
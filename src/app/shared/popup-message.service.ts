import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class PopupMessageService {
  constructor() {}

  showBackdropMessage(message: string = '') {
    Swal.fire({
      title: message,
      width: 600,
      padding: '3em',
      background: '#fff url(../../assets/images/trees.png)',
      backdrop: `
        rgba(0,0,123,0.4)
        url("../../assets/images/nyan-cat.gif")
        center bottom
        no-repeat
      `,
    });
  }

  showBasicMessage(message: string = '', type: SweetAlertIcon = 'warning') {
    Swal.fire({
      icon: type,
      title: 'Sorry!',
      text: message,
    });
  }
}

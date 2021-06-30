import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class PopupMessageService {
  constructor(private translate: TranslateService) {}

  showBackdropMessage(message: string = '') {
    this.translate.get(message).subscribe((data) => {
      message = data;
    });
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

  showBasicMessage(message: string = '', type: SweetAlertIcon = 'warning', title: string = '') {
    this.translate.get(message).subscribe((data) => {
      message = data;
    });
    const optionalTitle: string = this.translate.getDefaultLang() === 'en' ? 'Sorry!' : 'Lo Siento';
    Swal.fire({
      icon: type,
      title: title || optionalTitle,
      text: message,
    });
  }
}

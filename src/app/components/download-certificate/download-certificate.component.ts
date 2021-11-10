import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-download-certificate',
  templateUrl: './download-certificate.component.html',
  styleUrls: ['./download-certificate.component.css']
})
export class DownloadCertificateComponent implements OnInit {

  constructor() { }

  mobile='';
  otp='';
  regnumber='';

  ngOnInit(): void {
  }

  downloadCertificate() {

  }

}

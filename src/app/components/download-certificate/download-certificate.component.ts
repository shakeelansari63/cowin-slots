import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CowinApiService } from 'src/app/services/cowin-api.service';

@Component({
  selector: 'app-download-certificate',
  templateUrl: './download-certificate.component.html',
  styleUrls: ['./download-certificate.component.css']
})
export class DownloadCertificateComponent implements OnInit, OnDestroy {

  constructor(private covin: CowinApiService) { }

  subs: Subscription[] = [];

  mobile = '';
  displayOtpBtn = false;

  otp = '';
  isOTPSent = false;
  isOTPValid = false;

  regnumber = '';
  isRegValid = false;

  displayMessage = false;
  message = '';

  ngOnInit(): void {
    this.subs.push(this.covin.otpSent$.subscribe(res => this.isOTPSent = res));
    this.subs.push(this.covin.canGetOtp$.subscribe(res => this.displayOtpBtn = res));
    this.subs.push(this.covin.validOtp$.subscribe(res => this.isOTPValid = res));
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  downloadCertificate() {
    this.covin.getCertificate(this.regnumber);
  }

  numbersOnly(e) {
    const charCode = (e.which) ? e.which : e.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }

    if(e.srcElement.name == 'mobile' && this.mobile.length == 10) return false;

    if(e.srcElement.name == 'otp' && this.otp.length == 6) return false;

    if(e.srcElement.name == 'regnumber' && this.regnumber.length == 14) return false;

    return true;
  }

  validateMobile() {
    this.displayOtpBtn = this.mobile.length == 10;
  }

  validateRegistration() {
    this.isRegValid = this.regnumber.length >= 14;
  }

  validateOtp() {
    if(this.otp.length == 6) {
      this.covin.confirmOtp(this.otp);
    }
  }

  generateOTP() {
    this.covin.getOtp(this.mobile);
  }

}
